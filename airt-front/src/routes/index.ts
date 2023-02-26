export const Routes = {
  Register: "/register",
  Login: "/login",
  Home: "/",
  UploadImage: "/upload",
  Collections: "/collections",
  Favorites: "/favorites",
  Arts: "/arts",
  Profile: "/profile",
  Art: (id: string | number) => `/arts/${id}`,
} as const;
