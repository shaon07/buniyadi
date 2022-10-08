/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import { BsArrowUpCircle } from "react-icons/bs";
import { Language } from "../../pages/Pages";
import SidebarList from "./SidebarList";
export default function Sidebar({ categoryLists }) {


  const [sidebar, setSidebar] = useState(false);
  const { currentIdx, setCurrentIdx, lang } = useContext(Language)

  return (
    <div className={`sidebar shadow-sm ${sidebar ? 'active' : ''}`}>
      <h2> {lang ? "পণ্য বিভাগের তালিকা" : "Product Category Lists"}</h2>
      {/* Category List  */}
      <div className="sidebar-categoryList">
        <ul className="category">
          {
            categoryLists?.map((item, ind) => {
              return (
                <li className={`category-item ${currentIdx === item._id ? 'active' : ''} `} onClick={() => setCurrentIdx(item._id)} key={ind}>
                  <SidebarList item={item} ind={ind} key={ind} />
                </li>
              )
            })
          }
        </ul>

      </div>

      <div className="sidebar-icon" onClick={() => setSidebar(!sidebar)}>
        <BsArrowUpCircle />
      </div>
    </div>
  )
}
