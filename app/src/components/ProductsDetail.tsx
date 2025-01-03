import React, { useState } from 'react';
import { createFeedback, getProductFeedbacks } from '../api/api.tsx';
import './ProductsDetail.css';
import { FaStar } from 'react-icons/fa';

const ProductsDetail = ({ product }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState({ rating: 0, comment: '' });
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);  

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    await createFeedback({ ...feedback, product_id: product.id, user_id: user.id });
    setShowFeedbackForm(false);
  };

  const handleShowFeedbacks = async () => {
    const response = await getProductFeedbacks(product.id);
    console.log('Response:', response); // 添加日志
    if (response && response.data && Array.isArray(response.data.data)) {
      const formattedFeedbacks = response.data.data.map(fb => ({
        id: fb.id,
        user_name: fb.user_name,
        rating: fb.rating,
        comment: fb.comment,
      }));
      console.log('Formatted Feedbacks:', formattedFeedbacks); // 添加日志
      setFeedbacks(formattedFeedbacks);
    } else {
      setFeedbacks([]);
    }
    
    setShowFeedbacks(true);
  };

  return (
    <div className="product-card">
      <img src={String(product.image_url)} alt={product.name} />
      <h3>{product.name}</h3>
      <p>价格: {product.price}</p>
      <p>{product.description}</p>
      <div className="button-container">
        <button onClick={() => setShowFeedbackForm(true)}>反馈</button>
        <button onClick={handleShowFeedbacks}>详情</button>
      </div>

      {showFeedbackForm && (
        <div className="feedback-form">
          <form onSubmit={handleFeedbackSubmit}>
            <label>评分:</label>
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setFeedback({ ...feedback, rating: ratingValue })}
                    />
                    <FaStar
                      className="star"
                      color={ratingValue <= feedback.rating ? "#ffc107" : "#e4e5e9"}
                      size={20}
                    />
                  </label>
                );
              })}
            </div>
            <label>评论:</label>
            <textarea
              value={feedback.comment}
              onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
              required
            />
            <div className="feedback-buttons">
              <button type="submit">提交</button>
              <button type="button" onClick={() => setShowFeedbackForm(false)}>取消</button>
            </div>
          </form>
        </div>
      )}

      {showFeedbacks && (
        <div className="feedbacks-modal">
          <h3>反馈详情</h3>
          {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
            feedbacks.map((fb) => (
              <div key={fb.id} className="feedback-item">
                <div className="star-rating">
                  {[...Array(5)].map((star, index) => (
                    <FaStar
                      key={index}
                      className="star"
                      color={index < fb.rating ? "#ffc107" : "#e4e5e9"}
                      size={20}
                    />
                  ))}
                </div>
                <p>{fb.user_name}: {fb.comment}</p>
              </div>
            ))
          ) : (
            <p>没有反馈</p>
          )}
          <button onClick={() => setShowFeedbacks(false)}>关闭</button>
        </div>
      )}
    </div>
  );
};

export default ProductsDetail;