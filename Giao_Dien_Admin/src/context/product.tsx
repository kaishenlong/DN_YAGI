import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct, FormData, IUser } from '../interface/product';
import { GetAllProducts, DeleteProduct, AddProduct, UpdateProduct, AddUser, LoginUser } from '../services/product';
import { getCategoryBypr } from '../services/category';

type Props = {
  children: React.ReactNode;
};

export const ProductCT = createContext({} as any);

const ProductContext = ({ children }: Props) => {
  const [products, setProduct] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await GetAllProducts();
      setProduct(data);
    })();
  }, []);

  const onDelete = async (id: number | string) => {
    if (confirm('Bạn chắc chứ?')) {
      try {
        await DeleteProduct(id);
        alert('Xóa thành công');
        const newproducts = products.filter(product => product.id !== id);
        setProduct(newproducts);
      } catch (error) {
        // Xử lý lỗi
      }
    }
  };

  const onAdd = async (data: FormData) => {
    try {
      const product = await AddProduct(data);
      alert('Thêm mới thành công');
      setProduct([...products, product]);
      navigate('list');
    } catch (error) {
      // Xử lý lỗi
    }
  };

  const onRegister = async (data: IUser) => {
    try {
      await AddUser(data);
      alert('Đăng ký thành công');
      navigate('login');
    } catch (error) {
      // Xử lý lỗi
    }
  };

  const onLogin = async (data: IUser) => {
    try {
      const user = await LoginUser(data);
      alert('Đăng nhập thành công');
      sessionStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      // Xử lý lỗi
    }
  };

  const onUpdate = async (data: FormData, id: number | string) => {
    try {
      const resdata = await UpdateProduct(data, id);
      alert('Cập nhật thành công');
      const newproduct = products.map(product => (product.id === id ? resdata : product));
      setProduct(newproduct);
      navigate('list');
    } catch (error) {
      // Xử lý lỗi
    }
  };

  const onUpdateData = async (id: number | string) => {
    try {
      const resdata = await getCategoryBypr(id);
      setProduct(resdata);
    } catch (error) {
      // Xử lý lỗi
    }
  };

  const onUpdateReviewStatus = (id: number | string, status: boolean) => {
    setProduct(products.map(product =>
      product.id === id ? { ...product, isReviewed: status } : product
    ));
  };

  return (
    <ProductCT.Provider
      value={{
        products,
        onDelete,
        onAdd,
        onUpdate,
        onUpdateData,
        onRegister,
        onLogin,
        onUpdateReviewStatus, // Cung cấp hàm này cho các component tiêu thụ
      }}
    >
      {children}
    </ProductCT.Provider>
  );
};

export default ProductContext;
