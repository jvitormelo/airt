import { RequireAuth } from "@/auth/require-auth/RequireAuth";
import { ProfileView } from "@/views/profile/Profile";

const ProfilePage = () => {
  return (
    <RequireAuth>
      <ProfileView />
    </RequireAuth>
  );
};

export default ProfilePage;
