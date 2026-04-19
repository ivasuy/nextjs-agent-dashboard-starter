import { PageWrapper } from '@/components/layout';
import {
  SettingsProfile,
  SettingsWorkspace,
  SettingsDangerZone,
} from '@/features/settings/components';

export default function SettingsPage() {
  return (
    <PageWrapper title="Settings" description="Manage your profile, workspace, and preferences.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SettingsProfile />
        <SettingsWorkspace />
      </div>
      <div className="mt-6">
        <SettingsDangerZone />
      </div>
    </PageWrapper>
  );
}
