import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const navigation = [
    { name: 'Profile', href: 'profile', current: true },
    { name: 'Add Author', href: 'add_author', current: false },
    { name: 'Add book', href: 'add_book', current: false },
    { name: 'Log Out', href: '/', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')

}
export default function DropDownNavbar() {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const handleLogOut = () => {
        localStorage.remove("token")
        localStorage.remove("lang")
        localStorage.remove("dark")
        localStorage.remove("me")
        navigate("/")
    }
    return (
        <Disclosure as="nav" >
            {({ open }) => (
                <>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={"http://localhost:5000/" + JSON.parse(localStorage.getItem("me"))}
                                        alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#222]  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-center">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link

                                                to="/profile"
                                                className={classNames(active ? 'bg-gray-100' : '', 'text-[#C9AC8C;] block px-4 py-2 text-sm ')}
                                            >
                                                {t("homePage.header.dropdown.profile")}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to="/add_author"
                                                className={classNames(active ? 'bg-gray-100' : '', ' text-[#C9AC8C;] block px-4 py-2 text-sm')}
                                            >
                                                {t("homePage.header.dropdown.add_author")}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to="add_book"
                                                className={classNames(active ? 'bg-gray-100' : '', ' text-[#C9AC8C;] block px-4 py-2 text-sm')}
                                            >
                                                {t("homePage.header.dropdown.add_book")}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogOut}
                                                style={{
                                                    border: "none",
                                                    borderRadius: "0px",
                                                    width: "100%",
                                                    textAlign: "center ",
                                                    display: "block"

                                                }}
                                                className={classNames(active ? 'bg-gray-100' : '', 'text-[#C9AC8C;] block px-4 py-2 text-sm ')}
                                            >
                                                {t("homePage.header.dropdown.log_out")}
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}