import { Combobox } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
export default function SearchField() {

  const [dropdown, setDropdown] = useState(false)
  const [query, setQuery] = useState('');
  const [products, setProduct] = useState([])

  // fetching product data with search query
  useEffect(() => {
    fetch(`https://server.buniyadi.craftedsys.com/api/product?limit=50&search=${query}`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          console.log(res.status)
        }
      })
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
  }, [query]);

  return (
    <div className="search-field">
      <Combobox value={query}>
        <div className="search-field-box">
          <Combobox.Input
            className="search-field-input"
            onChange={(event) => { setQuery(event.target.value); setDropdown(true) }}
            placeholder="Search Product..."
          />
          {
            dropdown &&
            <div className="search-field-results shadow-sm">
              <Combobox.Options >
                {
                  products?.map((item, ind) => {
                    return (
                      <Combobox.Option
                        key={ind}
                        value={item.title}
                      >
                        <Link to={`/product-details/${item._id}`} className="d-flex align-items-center" onClick={() => {
                          setTimeout(() => {
                            setDropdown(false)
                          }, 1)
                        }}>
                          <div className="search-field-img">
                            <img src={`https://server.buniyadi.craftedsys.com/api/image/serve/${item.image[0]}?width=400&height=400&quality=75&format=webp&fit=contain&bg=fff`} alt="" />
                          </div>
                          <div className="search-field-title">

                            {item.title}

                          </div>
                        </Link>
                      </Combobox.Option>

                    )
                  })
                }
              </Combobox.Options>
            </div>
          }
        </div>
      </Combobox >
    </div >
  )
}
