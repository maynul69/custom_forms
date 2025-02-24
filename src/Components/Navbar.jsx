import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { jwtDecode } from "jwt-decode";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ adminEmails }) {
  console.log("Admin Emails:", adminEmails);

  
  const { t, i18n } = useTranslation();
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded?.role || null;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Templates', href: '/templates', current: false },
];
  if (role=="admin") {
    navigation.unshift(  { name: 'Dashboard', href: '/admin', current: true },
    )
  }



  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Persist selected language
  };


  

  const onLogout = () => {
    localStorage.removeItem("token"); // Remove the JWT token
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <Disclosure as="nav" className="bg-emerald-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-emerald-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Navbar Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-emerald-950 text-white' : 'text-gray-200 hover:bg-emerald-950 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {t(item.name)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Profile & Language Selection */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Language Selector */}
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="ml-4 rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-emerald-950 hover:text-white">
                🌍 {i18n.language.toUpperCase()}
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      English 🇺🇸
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => changeLanguage("bn")}
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      বাংলা 🇧🇩
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>

            {/* Profile & Logout */}
            <a
              href="/profile"
              className="ml-4 rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-emerald-950 hover:text-white"
            >
              {t("Your Profile")}
            </a>
            {token ? (
          <button onClick={onLogout} className="ml-4 rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-emerald-950 hover:text-white">
            Logout
          </button>
        ) : (
          <a href="/login" className="ml-4 rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-emerald-950 hover:text-white">
            Login
          </a>
        )}
          </div>
        </div>
      </div>

     


      {/* Mobile Navigation */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-emerald-900 text-white' : 'text-emerald-300 hover:bg-emerald-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {t(item.name)}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
