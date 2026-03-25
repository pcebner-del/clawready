#Requires -Version 5.1
<#
.SYNOPSIS
    ClawReady — OpenClaw Windows Installer
.DESCRIPTION
    Automates the complete setup of OpenClaw on Windows:
    - WSL2 enablement and Ubuntu installation
    - Node.js via nvm inside WSL2
    - OpenClaw global install
    - systemd configuration
    - Task Scheduler auto-start on boot
    - Sleep/hibernate prevention
    - Windows Update hardening
    - Browser-based setup wizard for API key, Telegram, and agent config
.NOTES
    Run as Administrator. Windows 10 2004+ or Windows 11 required.
    ClawReady v1.0 — https://clawready.dev
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ─────────────────────────────────────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────────────────────────────────────
$CR_VERSION    = "1.0.0"
$UBUNTU_DISTRO = "Ubuntu-22.04"
$NODE_VERSION  = "lts"
$OPENCLAW_PKG  = "openclaw"
$WIZARD_PORT   = 7230
$TASK_NAME     = "ClawReady-OpenClaw"

# ─────────────────────────────────────────────────────────────────────────────
# Console output helpers
# ─────────────────────────────────────────────────────────────────────────────
function Write-Header {
    Clear-Host
    Write-Host ""
    Write-Host "  ██████╗██╗      █████╗ ██╗    ██╗██████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗" -ForegroundColor Blue
    Write-Host " ██╔════╝██║     ██╔══██╗██║    ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝" -ForegroundColor Blue
    Write-Host " ██║     ██║     ███████║██║ █╗ ██║██████╔╝█████╗  ███████║██║  ██║ ╚████╔╝ " -ForegroundColor Cyan
    Write-Host " ██║     ██║     ██╔══██║██║███╗██║██╔══██╗██╔══╝  ██╔══██║██║  ██║  ╚██╔╝  " -ForegroundColor Cyan
    Write-Host " ╚██████╗███████╗██║  ██║╚███╔███╔╝██║  ██║███████╗██║  ██║██████╔╝   ██║   " -ForegroundColor Blue
    Write-Host "  ╚═════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝    ╚═╝  " -ForegroundColor Blue
    Write-Host ""
    Write-Host "  OpenClaw Windows Installer v$CR_VERSION" -ForegroundColor White
    Write-Host "  ─────────────────────────────────────" -ForegroundColor DarkGray
    Write-Host ""
}

function Write-Step {
    param([string]$Message)
    Write-Host "  " -NoNewline
    Write-Host ">" -ForegroundColor Blue -NoNewline
    Write-Host " $Message" -ForegroundColor White
}

function Write-OK {
    param([string]$Message)
    Write-Host "  " -NoNewline
    Write-Host "[OK]" -ForegroundColor Green -NoNewline
    Write-Host " $Message" -ForegroundColor Gray
}

function Write-Warn {
    param([string]$Message)
    Write-Host "  " -NoNewline
    Write-Host "[!]" -ForegroundColor Yellow -NoNewline
    Write-Host " $Message" -ForegroundColor Yellow
}

function Write-Fail {
    param([string]$Message)
    Write-Host ""
    Write-Host "  " -NoNewline
    Write-Host "[FAIL]" -ForegroundColor Red -NoNewline
    Write-Host " $Message" -ForegroundColor Red
    Write-Host ""
}

function Write-Divider {
    Write-Host "  ─────────────────────────────────────────────────────" -ForegroundColor DarkGray
}

function Pause-ForUser {
    param([string]$Message = "Press any key to continue...")
    Write-Host ""
    Write-Host "  $Message" -ForegroundColor DarkGray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# ─────────────────────────────────────────────────────────────────────────────
# Step 1: Administrator check
# ─────────────────────────────────────────────────────────────────────────────
function Assert-Administrator {
    Write-Step "Checking administrator privileges..."
    $currentPrincipal = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
    $isAdmin = $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

    if (-not $isAdmin) {
        Write-Fail "This script must be run as Administrator."
        Write-Host "  How to fix:" -ForegroundColor White
        Write-Host "    1. Close this window" -ForegroundColor Gray
        Write-Host "    2. Search for 'PowerShell' in the Start menu" -ForegroundColor Gray
        Write-Host "    3. Right-click -> 'Run as administrator'" -ForegroundColor Gray
        Write-Host "    4. Re-run this script" -ForegroundColor Gray
        Write-Host ""

        # Offer to auto-elevate
        $choice = Read-Host "  Would you like ClawReady to re-launch as Administrator? [Y/n]"
        if ($choice -ne 'n' -and $choice -ne 'N') {
            $scriptPath = $MyInvocation.ScriptName
            Start-Process PowerShell -Verb RunAs -ArgumentList "-ExecutionPolicy Bypass -File `"$scriptPath`""
        }
        exit 1
    }
    Write-OK "Running as Administrator"
}

# ─────────────────────────────────────────────────────────────────────────────
# Step 2: Windows version check
# ─────────────────────────────────────────────────────────────────────────────
function Assert-WindowsVersion {
    Write-Step "Checking Windows version..."

    $os = Get-WmiObject -Class Win32_OperatingSystem
    $buildNumber = [int]$os.BuildNumber
    $caption = $os.Caption

    # Windows 10 2004 = build 19041; Windows 11 = build 22000+
    if ($buildNumber -lt 19041) {
        Write-Fail "Windows 10 version 2004 (build 19041) or later is required for WSL2."
        Write-Host "  Your version: $caption (build $buildNumber)" -ForegroundColor Gray
        Write-Host "  Please update Windows and re-run this installer." -ForegroundColor Gray
        Write-Host ""
        exit 1
    }

    Write-OK "$caption (build $buildNumber) — WSL2 compatible"
}

# ─────────────────────────────────────────────────────────────────────────────
# Step 3: Enable WSL2 and Virtual Machine Platform
# ─────────────────────────────────────────────────────────────────────────────
function Enable-WSL2 {
    Write-Step "Checking WSL2 status..."

    $wslInstalled = $false
    try {
        $wslOutput = wsl --status 2>&1
        if ($LASTEXITCODE -eq 0 -or ($wslOutput -match "Default Version: 2")) {
            $wslInstalled = $true
        }
    } catch {
        $wslInstalled = $false
    }

    # Check if WSL feature is enabled
    $wslFeature = Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux -ErrorAction SilentlyContinue
    $vmFeature  = Get-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -ErrorAction SilentlyContinue

    $needsReboot = $false

    if ($wslFeature -and $wslFeature.State -ne "Enabled") {
        Write-Step "Enabling Windows Subsystem for Linux..."
        Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux -All -NoRestart | Out-Null
        Write-OK "WSL feature enabled"
        $needsReboot = $true
    } else {
        Write-OK "WSL feature already enabled"
    }

    if ($vmFeature -and $vmFeature.State -ne "Enabled") {
        Write-Step "Enabling Virtual Machine Platform..."
        Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -All -NoRestart | Out-Null
        Write-OK "Virtual Machine Platform enabled"
        $needsReboot = $true
    } else {
        Write-OK "Virtual Machine Platform already enabled"
    }

    if ($needsReboot) {
        Write-Warn "A reboot is required to complete WSL2 setup."
        Write-Host ""
        Write-Host "  After rebooting:" -ForegroundColor White
        Write-Host "    1. Open PowerShell as Administrator" -ForegroundColor Gray
        Write-Host "    2. Re-run this script — it will continue from where it left off" -ForegroundColor Gray
        Write-Host ""
        $choice = Read-Host "  Reboot now? [Y/n]"
        if ($choice -ne 'n' -and $choice -ne 'N') {
            Restart-Computer -Force
        }
        exit 0
    }

    # Set WSL default version to 2
    Write-Step "Setting WSL default version to 2..."
    wsl --set-default-version 2 2>&1 | Out-Null
    Write-OK "WSL2 set as default"

    # Update WSL kernel if needed
    Write-Step "Updating WSL2 kernel..."
    try {
        wsl --update 2>&1 | Out-Null
        Write-OK "WSL2 kernel up to date"
    } catch {
        Write-Warn "Could not update WSL2 kernel automatically. Continuing..."
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# Step 4: Install Ubuntu
# ─────────────────────────────────────────────────────────────────────────────
function Install-Ubuntu {
    Write-Step "Checking Ubuntu installation..."

    # Check if Ubuntu is already installed
    $installedDistros = wsl --list --quiet 2>&1
    $ubuntuInstalled = $installedDistros | Where-Object { $_ -match "Ubuntu" }

    if ($ubuntuInstalled) {
        Write-OK "Ubuntu already installed"
        return
    }

    Write-Step "Installing $UBUNTU_DISTRO (this may take a few minutes)..."

    # Try winget first, then wsl --install
    $wingetAvailable = $null -ne (Get-Command winget -ErrorAction SilentlyContinue)

    if ($wingetAvailable) {
        Write-Host "  Using winget..." -ForegroundColor DarkGray
        try {
            winget install --id Canonical.Ubuntu.2204 --accept-source-agreements --accept-package-agreements --silent 2>&1 | Out-Null
            Write-OK "$UBUNTU_DISTRO installed via winget"
        } catch {
            # Fall back to wsl --install
            Write-Host "  winget install failed, trying wsl --install..." -ForegroundColor DarkGray
            wsl --install -d Ubuntu-22.04 --no-launch 2>&1 | Out-Null
            Write-OK "$UBUNTU_DISTRO installed via wsl"
        }
    } else {
        Write-Host "  Using wsl --install..." -ForegroundColor DarkGray
        wsl --install -d Ubuntu-22.04 --no-launch 2>&1 | Out-Null
        Write-OK "$UBUNTU_DISTRO installed"
    }

    # Verify installation
    Start-Sleep -Seconds 3
    $installedDistros = wsl --list --quiet 2>&1
    $ubuntuInstalled = $installedDistros | Where-Object { $_ -match "Ubuntu" }

    if (-not $ubuntuInstalled) {
        Write-Fail "Ubuntu installation could not be verified. Please install Ubuntu manually from the Microsoft Store and re-run this script."
        exit 1
    }

    Write-OK "Ubuntu verified and ready"
}

# ─────────────────────────────────────────────────────────────────────────────
# Step 5: Configure systemd in WSL2
# ─────────────────────────────────────────────────────────────────────────────
function Set-WSLSystemd {
    Write-Step "Configuring systemd in WSL2..."

    $wslConfContent = @"
[boot]
systemd=true

[automount]
enabled = true
options = "metadata,umask=22,fmask=11"
mountFsTab = true

[network]
generateResolvConf = true

[interop]
enabled = true
appendWindowsPath = true
"@

    # Write /etc/wsl.conf inside Ubuntu
    $escapedContent = $wslConfContent -replace '"', '\"'
    $cmd = "sudo tee /etc/wsl.conf > /dev/null << 'WSLEOF'" + "`n" + $wslConfContent + "`nWSLEOF"

    wsl -d Ubuntu-22.04 -- bash -c "echo '$wslConfContent' | sudo tee /etc/wsl.conf > /dev/null" 2>&1 | Out-Null

    # More reliable approach: write via heredoc
    $scriptBlock = @'
cat > /tmp/wsl.conf.tmp << 'EOF'
[boot]
systemd=true

[automount]
enabled = true
options = "metadata,umask=22,fmask=11"
mountFsTab = true

[network]
generateResolvConf = true

[interop]
enabled = true
appendWindowsPath = true
EOF
sudo cp /tmp/wsl.conf.tmp /etc/wsl.conf
echo "done"
'@

    $result = wsl -d Ubuntu-22.04 -- bash -c $scriptBlock 2>&1
    Write-OK "WSL2 systemd configured in /etc/wsl.conf"

    # Restart WSL to apply systemd
    Write-Step "Restarting WSL2 to apply systemd configuration..."
    wsl --shutdown 2>&1 | Out-Null
    Start-Sleep -Seconds 3
    Write-OK "WSL2 restarted with systemd enabled"
}

# ─────────────────────────────────────────────────────────────────────────────
# Step 6: Install nvm + Node.js + OpenClaw inside WSL2
# ─────────────────────────────────────────────────────────────────────────────
function Install-NodeAndOpenClaw {
    Write-Step "Installing nvm, Node.js, and OpenClaw inside WSL2..."
    Write-Host "  (This may take 3-5 minutes)" -ForegroundColor DarkGray
    Write-Host ""

    $installScript = @'
#!/bin/bash
set -e

echo "  [WSL] Updating apt packages..."
sudo apt-get update -qq 2>&1 | tail -1

echo "  [WSL] Installing build essentials..."
sudo apt-get install -y -qq curl git build-essential 2>&1 | tail -1

echo "  [WSL] Installing nvm..."
export NVM_DIR="$HOME/.nvm"
if [ ! -d "$NVM_DIR" ]; then
    curl -s -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "  [WSL] Installing Node.js LTS..."
nvm install --lts
nvm use --lts
nvm alias default node

NODE_VERSION=$(node --version)
echo "  [WSL] Node.js $NODE_VERSION installed"

echo "  [WSL] Installing OpenClaw..."
npm install -g openclaw 2>&1 | grep -E "(added|error)" | head -5

# Verify openclaw
if command -v openclaw &> /dev/null; then
    OPENCLAW_VERSION=$(openclaw --version 2>/dev/null || echo "installed")
    echo "  [WSL] OpenClaw $OPENCLAW_VERSION installed successfully"
else
    echo "ERROR: openclaw command not found after install"
    exit 1
fi

# Add nvm to .bashrc if not present
if ! grep -q "NVM_DIR" ~/.bashrc; then
    cat >> ~/.bashrc << 'BASHEOF'

# nvm (added by ClawReady)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
BASHEOF
fi

echo "CLAWREADY_SUCCESS"
'@

    # Write the script to a temp file and execute it
    $tempScript = [System.IO.Path]::GetTempFileName() + ".sh"
    $installScript | Out-File -FilePath $tempScript -Encoding UTF8 -NoNewline

    # Convert Windows path to WSL path
    $wslTempPath = wsl -d Ubuntu-22.04 -- wslpath $tempScript.Replace('\', '/')

    # Execute the install script
    $output = wsl -d Ubuntu-22.04 -- bash $wslTempPath 2>&1
    Remove-Item $tempScript -ErrorAction SilentlyContinue

    # Print output
    $output | ForEach-Object { Write-Host "  $_" -ForegroundColor DarkGray }

    # Check for success marker
    if ($output -match "CLAWREADY_SUCCESS") {
        Write-OK "nvm, Node.js, and OpenClaw installed successfully"
    } else {
        Write-Fail "Installation failed. Check the output above for errors."
        exit 1
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# Step 7: Create Task Scheduler boot task
# ─────────────────────────────────────────────────────────────────────────────
function Set-BootTask {
    Write-Step "Creating Windows boot task for OpenClaw auto-start..."

    # Remove existing task if present
    $existingTask = Get-ScheduledTask -TaskName $TASK_NAME -ErrorAction SilentlyContinue
    if ($existingTask) {
        Unregister-ScheduledTask -TaskName $TASK_NAME -Confirm:$false
        Write-Host "  Removed existing task" -ForegroundColor DarkGray
    }

    # WSL command to start OpenClaw via systemd
    $wslCommand = "C:\Windows\System32\wsl.exe"
    $wslArgs    = '-d Ubuntu-22.04 -- bash -c "source ~/.nvm/nvm.sh && openclaw gateway start" &'

    $action  = New-ScheduledTaskAction -Execute $wslCommand -Argument $wslArgs
    $trigger = New-ScheduledTaskTrigger -AtLogOn

    $settings = New-ScheduledTaskSettingsSet `
        -AllowStartIfOnBatteries `
        -DontStopIfGoingOnBatteries `
        -StartWhenAvailable `
        -RunOnlyIfNetworkAvailable:$false `
        -ExecutionTimeLimit (New-TimeSpan -Hours 0)  # No time limit

    $principal = New-ScheduledTaskPrincipal `
        -UserId (whoami) `
        -RunLevel Highest `
        -LogonType Interactive

    Register-ScheduledTask `
        -TaskName $TASK_NAME `
        -Action $action `
        -Trigger $trigger `
        -Settings $settings `
        -Principal $principal `
        -Description "Starts OpenClaw AI agent on Windows boot (installed by ClawReady)" `
        -Force | Out-Null

    Write-OK "Boot task '$TASK_NAME' created — OpenClaw will start on every login"
}

# ─────────────────────────────────────────────────────────────────────────────
# Step 8: Configure power settings (prevent sleep)
# ─────────────────────────────────────────────────────────────────────────────
function Set-PowerSettings {
    Write-Step "Configuring power settings to prevent sleep..."

    try {
        # Disable sleep on AC power (plugged in)
        powercfg /change standby-timeout-ac 0 2>&1 | Out-Null
        # Disable hibernate on AC power
        powercfg /change hibernate-timeout-ac 0 2>&1 | Out-Null
        # Disable monitor timeout on AC power (optional — set to 30 min)
        powercfg /change monitor-timeout-ac 30 2>&1 | Out-Null
        # Disable hard disk timeout on AC power
        powercfg /change disk-timeout-ac 0 2>&1 | Out-Null

        # Also prevent sleep on battery (conservative — 60 min)
        powercfg /change standby-timeout-dc 60 2>&1 | Out-Null

        # Request a system availability from Windows
        powercfg /requestsoverride PROCESS powershell.exe SYSTEM 2>&1 | Out-Null

        Write-OK "Sleep disabled on AC power — OpenClaw stays online 24/7"
    } catch {
        Write-Warn "Could not fully configure power settings: $_"
        Write-Warn "You may need to disable sleep manually in Settings > Power."
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# Step 9: Disable Windows Update active hours interference
# ─────────────────────────────────────────────────────────────────────────────
function Set-WindowsUpdatePolicy {
    Write-Step "Hardening Windows Update settings..."

    try {
        $wuPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU"
        if (-not (Test-Path $wuPath)) {
            New-Item -Path $wuPath -Force | Out-Null
        }

        # Set active hours to block restarts during typical usage (7am - 11pm)
        $auOptionsPath = "HKLM:\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings"
        if (-not (Test-Path $auOptionsPath)) {
            New-Item -Path $auOptionsPath -Force | Out-Null
        }

        Set-ItemProperty -Path $auOptionsPath -Name "ActiveHoursStart" -Value 7  -Type DWord -Force
        Set-ItemProperty -Path $auOptionsPath -Name "ActiveHoursEnd"   -Value 23 -Type DWord -Force

        # Disable auto-restart with logged on users
        Set-ItemProperty -Path $wuPath -Name "NoAutoRebootWithLoggedOnUsers" -Value 1 -Type DWord -Force

        Write-OK "Windows Update active hours set (7am-11pm) — no surprise reboots"
    } catch {
        Write-Warn "Could not configure Windows Update policy: $_"
        Write-Warn "You may want to set active hours manually in Windows Update settings."
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# Step 10: Launch browser setup wizard
# ─────────────────────────────────────────────────────────────────────────────
function Start-SetupWizard {
    Write-Step "Launching setup wizard..."

    $wizardHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ClawReady Setup Wizard</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #050a14;
    color: #e2e8f0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  .wizard {
    background: #0a1628;
    border: 1px solid rgba(59,130,246,0.3);
    border-radius: 1.5rem;
    padding: 3rem;
    max-width: 580px;
    width: 100%;
    box-shadow: 0 0 40px rgba(59,130,246,0.1);
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }
  .logo-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.25rem;
  }
  .logo-text { font-weight: 700; font-size: 1.25rem; color: white; }
  h1 { font-size: 1.75rem; font-weight: 700; color: white; margin-bottom: 0.5rem; }
  .subtitle { color: #64748b; margin-bottom: 2.5rem; line-height: 1.6; }

  /* Steps */
  .steps { display: flex; gap: 0.5rem; margin-bottom: 2.5rem; }
  .step-dot {
    flex: 1; height: 4px; border-radius: 2px;
    background: #1e3a6e;
    transition: background 0.3s;
  }
  .step-dot.active { background: #3b82f6; }
  .step-dot.done { background: #22c55e; }

  /* Panels */
  .panel { display: none; }
  .panel.active { display: block; }
  .panel-title {
    font-size: 1.1rem; font-weight: 600; color: white;
    margin-bottom: 0.5rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .panel-desc { color: #94a3b8; font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.6; }

  label { display: block; font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.5rem; font-weight: 500; }
  input[type="text"], input[type="password"] {
    width: 100%;
    background: #050a14;
    border: 1px solid rgba(59,130,246,0.2);
    border-radius: 0.75rem;
    padding: 0.875rem 1rem;
    color: white;
    font-family: 'Consolas', monospace;
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
    transition: border-color 0.2s;
  }
  input:focus { outline: none; border-color: rgba(59,130,246,0.6); }

  .info-box {
    background: rgba(59,130,246,0.08);
    border: 1px solid rgba(59,130,246,0.2);
    border-radius: 0.75rem;
    padding: 1rem;
    font-size: 0.85rem;
    color: #93c5fd;
    margin-bottom: 1.25rem;
    line-height: 1.6;
  }
  .info-box a { color: #60a5fa; }
  .success-box {
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.2);
    border-radius: 0.75rem;
    padding: 1.5rem;
    text-align: center;
  }
  .success-box .check { font-size: 3rem; margin-bottom: 1rem; }
  .success-box h2 { color: #4ade80; font-size: 1.5rem; margin-bottom: 0.5rem; }
  .success-box p { color: #94a3b8; font-size: 0.9rem; line-height: 1.6; }

  .btn {
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 0.75rem;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: background 0.2s;
  }
  .btn:hover { background: #3b82f6; }
  .btn:active { background: #1d4ed8; }
  .btn-secondary {
    background: transparent;
    border: 1px solid #334155;
    color: #94a3b8;
    margin-top: 0.75rem;
  }
  .btn-secondary:hover { background: #0f172a; border-color: #475569; color: white; }

  .step-num {
    width: 24px; height: 24px;
    background: rgba(59,130,246,0.2);
    color: #60a5fa;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700;
  }
</style>
</head>
<body>
<div class="wizard">
  <div class="logo">
    <div class="logo-icon">&#9889;</div>
    <span class="logo-text">ClawReady Setup</span>
  </div>

  <div class="steps">
    <div class="step-dot active" id="dot-1"></div>
    <div class="step-dot" id="dot-2"></div>
    <div class="step-dot" id="dot-3"></div>
    <div class="step-dot" id="dot-4"></div>
  </div>

  <!-- Panel 1: Welcome -->
  <div class="panel active" id="panel-1">
    <h1>Almost there!</h1>
    <p class="subtitle">
      ClawReady has installed and configured everything on your system.
      Now let's set up your AI agent — it only takes 2 minutes.
    </p>
    <div class="info-box">
      You'll need:
      <br>&#x2022; An Anthropic API key (get one at <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a>)
      <br>&#x2022; A Telegram account (optional, for messaging your agent)
    </div>
    <button class="btn" onclick="nextPanel(1)">Let's go &rarr;</button>
  </div>

  <!-- Panel 2: API Key -->
  <div class="panel" id="panel-2">
    <p class="panel-title"><span class="step-num">1</span> Anthropic API Key</p>
    <p class="panel-desc">
      Your API key powers the AI. It starts with <code style="color:#60a5fa">sk-ant-</code>.
      Get yours at <a href="https://console.anthropic.com/keys" target="_blank" style="color:#60a5fa">console.anthropic.com/keys</a>.
    </p>
    <label for="api-key">API Key</label>
    <input type="password" id="api-key" placeholder="sk-ant-api03-..." autocomplete="off" />
    <div class="info-box">
      Your key is stored locally in OpenClaw's config on your machine.
      It is never sent to ClawReady servers.
    </div>
    <button class="btn" onclick="saveApiKey()">Save API key &rarr;</button>
    <button class="btn btn-secondary" onclick="nextPanel(2)">Skip for now</button>
  </div>

  <!-- Panel 3: Telegram -->
  <div class="panel" id="panel-3">
    <p class="panel-title"><span class="step-num">2</span> Telegram Bot (Optional)</p>
    <p class="panel-desc">
      Connect a Telegram bot to message your AI agent from anywhere.
      This step is optional — you can always do it later.
    </p>
    <div class="info-box">
      To create a bot:
      <br>1. Open Telegram and message <strong>@BotFather</strong>
      <br>2. Send <code style="color:#60a5fa">/newbot</code> and follow the prompts
      <br>3. Copy the token it gives you and paste it below
    </div>
    <label for="tg-token">Bot Token</label>
    <input type="text" id="tg-token" placeholder="1234567890:ABCDef..." autocomplete="off" />
    <label for="tg-chat">Your Chat ID (message @userinfobot to get it)</label>
    <input type="text" id="tg-chat" placeholder="123456789" autocomplete="off" />
    <button class="btn" onclick="saveTelegram()">Save Telegram &rarr;</button>
    <button class="btn btn-secondary" onclick="nextPanel(3)">Skip for now</button>
  </div>

  <!-- Panel 4: Agent name -->
  <div class="panel" id="panel-4">
    <p class="panel-title"><span class="step-num">3</span> Name Your Agent</p>
    <p class="panel-desc">
      Give your AI agent a name and a short personality description.
      You can change this any time in OpenClaw's settings.
    </p>
    <label for="agent-name">Agent name</label>
    <input type="text" id="agent-name" placeholder="e.g. Claw, Max, Friday..." value="Claw" />
    <label for="agent-persona">Personality (optional)</label>
    <input type="text" id="agent-persona" placeholder="e.g. Helpful, direct, and a bit dry." />
    <button class="btn" onclick="finishSetup()">Finish setup</button>
  </div>

  <!-- Panel 5: Done -->
  <div class="panel" id="panel-5">
    <div class="success-box">
      <div class="check">&#10003;</div>
      <h2>You're all set!</h2>
      <p>
        OpenClaw is installed, configured, and will start automatically with Windows.
        <br><br>
        Your AI agent is running at <strong style="color:#60a5fa">localhost:3000</strong>
        <br><br>
        You can close this window.
      </p>
    </div>
  </div>
</div>

<script>
let currentPanel = 1;

function nextPanel(from) {
  document.getElementById('panel-' + from).classList.remove('active');
  document.getElementById('dot-' + from).classList.remove('active');
  document.getElementById('dot-' + from).classList.add('done');
  currentPanel = from + 1;
  document.getElementById('panel-' + currentPanel).classList.add('active');
  if (currentPanel <= 4) {
    document.getElementById('dot-' + currentPanel).classList.add('active');
  }
}

function saveApiKey() {
  const key = document.getElementById('api-key').value.trim();
  if (key && !key.startsWith('sk-ant-')) {
    alert('That does not look like an Anthropic API key. It should start with sk-ant-');
    return;
  }
  if (key) {
    fetch('/save-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anthropic_api_key: key })
    }).catch(() => {});
  }
  nextPanel(2);
}

function saveTelegram() {
  const token = document.getElementById('tg-token').value.trim();
  const chatId = document.getElementById('tg-chat').value.trim();
  if (token && chatId) {
    fetch('/save-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegram_token: token, telegram_chat_id: chatId })
    }).catch(() => {});
  }
  nextPanel(3);
}

function finishSetup() {
  const name = document.getElementById('agent-name').value.trim() || 'Claw';
  const persona = document.getElementById('agent-persona').value.trim();
  fetch('/save-config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agent_name: name, agent_persona: persona, setup_complete: true })
  }).catch(() => {});
  document.getElementById('panel-4').classList.remove('active');
  document.getElementById('dot-4').classList.remove('active');
  document.getElementById('dot-4').classList.add('done');
  document.getElementById('panel-5').classList.add('active');

  // Signal the PowerShell script that setup is done
  fetch('/setup-complete').catch(() => {});
}
</script>
</body>
</html>
"@

    # Write wizard HTML to temp file
    $tempHtml = Join-Path $env:TEMP "clawready-wizard.html"
    $wizardHtml | Out-File -FilePath $tempHtml -Encoding UTF8 -NoNewline

    # Start a simple HTTP server using .NET HttpListener to serve the wizard
    # and collect config data
    $configData = @{}
    $setupComplete = $false
    $serverDone = $false

    $listenerJob = Start-Job -ScriptBlock {
        param($port, $htmlPath, $configOut)

        $listener = [System.Net.HttpListener]::new()
        $listener.Prefixes.Add("http://localhost:$port/")
        $listener.Start()

        $done = $false
        $config = @{}

        while (-not $done) {
            try {
                $context = $listener.GetContext()
                $request  = $context.Request
                $response = $context.Response

                if ($request.HttpMethod -eq "GET" -and $request.Url.AbsolutePath -eq "/") {
                    $html = [System.IO.File]::ReadAllBytes($htmlPath)
                    $response.ContentType = "text/html; charset=utf-8"
                    $response.ContentLength64 = $html.Length
                    $response.OutputStream.Write($html, 0, $html.Length)

                } elseif ($request.HttpMethod -eq "POST" -and $request.Url.AbsolutePath -eq "/save-config") {
                    $reader = [System.IO.StreamReader]::new($request.InputStream)
                    $body   = $reader.ReadToEnd()
                    $reader.Close()
                    # Save raw JSON
                    $body | Out-File -FilePath "$configOut.json" -Append -Encoding UTF8
                    $response.StatusCode = 200

                } elseif ($request.Url.AbsolutePath -eq "/setup-complete") {
                    "done" | Out-File -FilePath "$configOut.done" -Encoding UTF8
                    $response.StatusCode = 200
                    $done = $true
                } else {
                    $response.StatusCode = 404
                }

                $response.Close()
            } catch {
                if (-not $done) {
                    Start-Sleep -Milliseconds 100
                }
            }
        }

        $listener.Stop()
        $listener.Close()

    } -ArgumentList $WIZARD_PORT, $tempHtml, "$env:TEMP\clawready-config"

    # Open the browser
    Start-Sleep -Seconds 1
    Start-Process "http://localhost:$WIZARD_PORT"

    Write-OK "Setup wizard opened in your browser"
    Write-Host ""
    Write-Host "  Complete the wizard in your browser to configure:" -ForegroundColor White
    Write-Host "    - Anthropic API key" -ForegroundColor Gray
    Write-Host "    - Telegram bot (optional)" -ForegroundColor Gray
    Write-Host "    - Agent name and personality" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  Waiting for you to finish the wizard..." -ForegroundColor DarkGray

    # Wait for wizard completion (up to 10 minutes)
    $timeout = 600
    $elapsed = 0
    while ($elapsed -lt $timeout) {
        if (Test-Path "$env:TEMP\clawready-config.done") {
            Remove-Item "$env:TEMP\clawready-config.done" -ErrorAction SilentlyContinue
            break
        }
        Start-Sleep -Seconds 2
        $elapsed += 2
    }

    # Apply config if collected
    if (Test-Path "$env:TEMP\clawready-config.json") {
        $configLines = Get-Content "$env:TEMP\clawready-config.json" -ErrorAction SilentlyContinue
        Remove-Item "$env:TEMP\clawready-config.json" -ErrorAction SilentlyContinue

        # Parse and apply config via openclaw CLI inside WSL2
        foreach ($line in $configLines) {
            try {
                $json = $line | ConvertFrom-Json
                if ($json.anthropic_api_key) {
                    $key = $json.anthropic_api_key
                    wsl -d Ubuntu-22.04 -- bash -c "source ~/.nvm/nvm.sh && openclaw config set anthropic_api_key '$key'" 2>&1 | Out-Null
                }
                if ($json.telegram_token) {
                    $token = $json.telegram_token
                    wsl -d Ubuntu-22.04 -- bash -c "source ~/.nvm/nvm.sh && openclaw config set telegram_token '$token'" 2>&1 | Out-Null
                }
                if ($json.telegram_chat_id) {
                    $chatId = $json.telegram_chat_id
                    wsl -d Ubuntu-22.04 -- bash -c "source ~/.nvm/nvm.sh && openclaw config set telegram_chat_id '$chatId'" 2>&1 | Out-Null
                }
                if ($json.agent_name) {
                    $name = $json.agent_name
                    wsl -d Ubuntu-22.04 -- bash -c "source ~/.nvm/nvm.sh && openclaw config set agent_name '$name'" 2>&1 | Out-Null
                }
            } catch {
                # Ignore JSON parse errors
            }
        }
    }

    Stop-Job $listenerJob -ErrorAction SilentlyContinue
    Remove-Job $listenerJob -ErrorAction SilentlyContinue
    Remove-Item $tempHtml -ErrorAction SilentlyContinue

    Write-OK "Setup wizard completed"
}

# ─────────────────────────────────────────────────────────────────────────────
# Step 11: Start OpenClaw
# ─────────────────────────────────────────────────────────────────────────────
function Start-OpenClaw {
    Write-Step "Starting OpenClaw for the first time..."

    try {
        # Start OpenClaw in background inside WSL2
        wsl -d Ubuntu-22.04 -- bash -c "source ~/.nvm/nvm.sh && nohup openclaw gateway start > /tmp/openclaw-startup.log 2>&1 &" 2>&1 | Out-Null
        Start-Sleep -Seconds 3
        Write-OK "OpenClaw started in background"
    } catch {
        Write-Warn "Could not auto-start OpenClaw: $_"
        Write-Warn "It will start automatically on next Windows login."
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# Final success screen
# ─────────────────────────────────────────────────────────────────────────────
function Show-Success {
    Write-Host ""
    Write-Divider
    Write-Host ""
    Write-Host "  " -NoNewline
    Write-Host "  ClawReady!  " -ForegroundColor Black -BackgroundColor Cyan -NoNewline
    Write-Host "  OpenClaw is installed and running." -ForegroundColor White
    Write-Host ""
    Write-Host "  What was set up:" -ForegroundColor White
    Write-Host "    WSL2 + Ubuntu 22.04           " -ForegroundColor Green -NoNewline; Write-Host "ready" -ForegroundColor DarkGray
    Write-Host "    Node.js LTS (via nvm)         " -ForegroundColor Green -NoNewline; Write-Host "ready" -ForegroundColor DarkGray
    Write-Host "    OpenClaw (latest)              " -ForegroundColor Green -NoNewline; Write-Host "ready" -ForegroundColor DarkGray
    Write-Host "    Auto-start on boot             " -ForegroundColor Green -NoNewline; Write-Host "configured" -ForegroundColor DarkGray
    Write-Host "    Sleep prevention               " -ForegroundColor Green -NoNewline; Write-Host "enabled" -ForegroundColor DarkGray
    Write-Host "    Windows Update hardening       " -ForegroundColor Green -NoNewline; Write-Host "enabled" -ForegroundColor DarkGray
    Write-Host ""
    Write-Divider
    Write-Host ""
    Write-Host "  Next steps:" -ForegroundColor White
    Write-Host "    1. Your AI agent runs at:  " -NoNewline -ForegroundColor Gray
    Write-Host "http://localhost:3000" -ForegroundColor Cyan
    Write-Host "    2. It will auto-start on every Windows login" -ForegroundColor Gray
    Write-Host "    3. Message it via Telegram (if configured)" -ForegroundColor Gray
    Write-Host "    4. To restart manually: " -NoNewline -ForegroundColor Gray
    Write-Host "wsl -d Ubuntu-22.04 -- openclaw gateway start" -ForegroundColor Blue
    Write-Host ""
    Write-Host "  Thank you for using ClawReady!" -ForegroundColor Blue
    Write-Host ""
    Write-Divider
    Write-Host ""
    Pause-ForUser "Press any key to exit..."
}

# ─────────────────────────────────────────────────────────────────────────────
# Main execution
# ─────────────────────────────────────────────────────────────────────────────
function Main {
    Write-Header

    Write-Host "  This installer will set up OpenClaw on your Windows PC." -ForegroundColor Gray
    Write-Host "  It will:" -ForegroundColor Gray
    Write-Host "    - Enable WSL2 and install Ubuntu 22.04" -ForegroundColor DarkGray
    Write-Host "    - Install Node.js LTS and OpenClaw" -ForegroundColor DarkGray
    Write-Host "    - Configure auto-start, sleep prevention, and more" -ForegroundColor DarkGray
    Write-Host ""

    $choice = Read-Host "  Ready to begin? [Y/n]"
    if ($choice -eq 'n' -or $choice -eq 'N') {
        Write-Host "  Installation cancelled." -ForegroundColor DarkGray
        exit 0
    }

    Write-Host ""
    Write-Divider
    Write-Host ""

    # Run all steps in order
    Assert-Administrator
    Assert-WindowsVersion
    Enable-WSL2
    Install-Ubuntu
    Set-WSLSystemd
    Install-NodeAndOpenClaw
    Set-BootTask
    Set-PowerSettings
    Set-WindowsUpdatePolicy
    Start-SetupWizard
    Start-OpenClaw
    Show-Success
}

# Entry point
Main
