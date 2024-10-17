import React, { useContext } from 'react'
import { IPCategory, IProduct } from '../interface/product'
import { Link, Outlet } from 'react-router-dom'
import { ProductCT } from '../context/product'


const Productlist = () => {
  const {products,onDelete} = useContext(ProductCT)
  return (
    <>

    <div className="p-4 xl:ml-80">
        <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div className="capitalize">
              <nav aria-label="breadcrumb" className="w-max">
                <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                  <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                    <a href="#">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                    </a>
                    <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                  </li>
                  <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">home</p>
                  </li>
                </ol>
              </nav>
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">home</h6>
            </div>
            
          </div>
        </nav>
        <div className="mt-12 w-[1700px]">
         
          
          <div className="mb-4 grid grid-cols-1 gap-6 2xl:grid-cols-3">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
              <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                <div>
                  <Link to={'add'}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
                    Thêm Sản Phẩm
                  </Link>
                  
                </div>
                <div>
                <Link to={'/dashboard/category'}
                    className="bg-blue-500  hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
                    Danh Sách Danh Mục
                  </Link>
                </div>
               
              </div>
    
    <div className="">
    
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="y-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 ">
                                   STT
                                </th>
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                    Product Name
                                </th>
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                     Price
                                </th>
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                     Image
                                </th>
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Category
                                </th>
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Chức Năng
                                </th>
                              
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            
                            {
                              products.map((product:IProduct,index:number) =>(
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {index+1}
                                </td>
                                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               {product.name}
                                </td>
                                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.price}</td>
                                <td className="border-blue-gray-50 px-6 py-4 text-left">
                            <img src={product.image}  className="w-12 h-12 object-cover rounded-lg" />
                          </td>
                                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.category}</td>
                                <td className="py-4 px-6 text-sm text-left font-medium  whitespace-nowrap">
                                    <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline"><Link to={`/dashboard/list/edit/${product.id}`}>Edit</Link></a>
                                    
                                    <button onClick={() => onDelete(product.id)} className="text-red-600 ml-4 dark:text-red-500 hover:underline">
                                    Delete
                                    </button>
                                </td>
                            </tr>
                              ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>
            </div>
          </div>
        </div>
      
      </div>
        </>
  )
}

export default Productlist