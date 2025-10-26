import React, { useState } from 'react';
import { Card, Button, Input } from '../components/ui';

interface Props {
  dark: boolean;
}

const Settings: React.FC<Props> = ({ dark }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [themePreference, setThemePreference] = useState<'light' | 'dark'>('dark');

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className={`p-8 ${dark ? 'text-white' : 'text-gray-900'} transition-colors`}>
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <Card className={`${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} p-6 mb-6`}>
        <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm">Username</label>
            <Input
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className={`${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
            />
          </div>
        </div>
      </Card>

      <Card className={`${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} p-6 mb-6`}>
        <h3 className="text-xl font-semibold mb-4">Preferences</h3>
        <div className="flex items-center justify-between mb-4">
          <span>Enable Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5 accent-blue-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Theme Preference</span>
          <select
            value={themePreference}
            onChange={(e) => setThemePreference(e.target.value as 'light' | 'dark')}
            className={`rounded-md px-3 py-2 border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </Card>

      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
        Save Settings
      </Button>
    </div>
  );
};

export default Settings;
