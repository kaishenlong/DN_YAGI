import React, { useState, useEffect, createContext } from 'react';

import { GetAllReview } from '../services/review';
import { IReview } from '../interface/review';

type Props = {
  children: React.ReactNode;
};

export const ReviewCT = createContext({} as any);

const ReviewContext = ({ children }: Props) => {
  const [review, setReview] = useState<IReview[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await GetAllReview();
        
        setReview(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error appropriately (e.g., show error message to user)
      }
    })();   
  }, []);
  const onUpdateReviewStatus = (id: number | string, status: boolean) => {
    setReview(review.map(product =>
      product.id === id ? { ...product, isReviewed: status } : product
    ));
  };

  return (
    <ReviewCT.Provider value={{ review,onUpdateReviewStatus, }}>
      {children}
    </ReviewCT.Provider>
  );
};

export default ReviewContext;