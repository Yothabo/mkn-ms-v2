export const useAppHeaderActions = (logout: () => void) => {
  const handleLogout = () => {
    logout();
  };

  return {
    handleLogout
  };
};
