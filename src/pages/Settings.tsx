import { Bell, Shield, Users, Building2, Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and account settings</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="col-span-2 space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <h3 className="text-foreground mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">JD</span>
                </div>
                <button className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  Change Avatar
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@factoryshield.com"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Role</label>
                <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Admin</option>
                  <option>Safety Officer</option>
                  <option>Manager</option>
                  <option>Operator</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-foreground">Notification Preferences</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">Critical Alerts</p>
                  <p className="text-xs text-muted-foreground">Receive notifications for critical incidents</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">Warning Alerts</p>
                  <p className="text-xs text-muted-foreground">Get notified about warning-level incidents</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">Daily Reports</p>
                  <p className="text-xs text-muted-foreground">Receive daily safety summary reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-foreground">Security</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="w-full px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <h3 className="text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                <Users className="w-4 h-4 mr-2" />
                Manage Team
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                <Building2 className="w-4 h-4 mr-2" />
                Facility Settings
              </button>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <h3 className="text-foreground mb-4">System Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="text-foreground font-medium">v2.4.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Update</span>
                <span className="text-foreground font-medium">Feb 10, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">License</span>
                <span className="text-foreground font-medium">Enterprise</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-success font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <h3 className="text-foreground mb-4">Support</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 text-sm bg-background border border-border text-foreground rounded-lg hover:bg-background/70 transition-colors">
                Documentation
              </button>
              <button className="w-full px-4 py-2 text-sm bg-background border border-border text-foreground rounded-lg hover:bg-background/70 transition-colors">
                Contact Support
              </button>
              <button className="w-full px-4 py-2 text-sm bg-background border border-border text-foreground rounded-lg hover:bg-background/70 transition-colors">
                Report Issue
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-card rounded-xl p-6 border border-destructive shadow-lg">
            <h3 className="text-destructive mb-4">Danger Zone</h3>
            <button className="w-full px-4 py-2 text-sm bg-destructive/10 border border-destructive text-destructive rounded-lg hover:bg-destructive/20 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
