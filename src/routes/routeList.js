import Dashboard from '../pages/dashboard';
import Collection from '../pages/library';
import Settings from '../pages/settings';
import Users from '../pages/users';
import Invites from '../pages/invites';
import Categories from '../pages/categories';
import SignIn from '../pages/auth';

export default [
  {
    isOpen: true,
    exact: true,
    path: "/login",
    component: SignIn
  },
  {
    exact: true,
    path: "/",
    component: Dashboard
  },
  {
    exact: true,
    path: "/collection",
    component: Collection
  },
  {
    exact: true,
    path: "/categories",
    component: Categories
  },
  {
    exact: true,
    path: "/users",
    component: Users
  },
  {
    exact: true,
    path: "/invites",
    component: Invites
  },
  {
    exact: true,
    path: "/settings",
    component: Settings
  }
]
