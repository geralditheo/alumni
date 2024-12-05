'use client';

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiOutlineHome } from 'react-icons/hi';

type TBreadCrumbProps = {
    capitalizeLinks?: boolean
}

export default function AutoBreadcrumb({  capitalizeLinks }: TBreadCrumbProps){
    
    const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path )
    const separator = ">";
    
    return (
        <section >
            <ul className="flex gap-2 items-center ">
                <li className="text-sm font-semibold text-blue-500"><Link href={'/'}><HiOutlineHome /></Link></li>
                {pathNames.length > 0 && separator}
                {
                    pathNames.map( (link, index) => {
                        const href = `/${pathNames.slice(0, index + 1).join('/')}`
                        const itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                        return (
                            <React.Fragment key={index}>
                                <li className="text-sm font-semibold text-blue-500" >
                                    <Link href={href}>{itemLink}</Link>
                                </li>
                                <p className="text-sm font-semibold text-blue-500" > {pathNames.length !== index + 1 && separator}</p>
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </section>
    )
}