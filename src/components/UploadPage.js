import { Form, Divider, Input, InputNumber, Button, Upload, message } from "antd";
import "./UploadPage.scss";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { API_URL } from "../config/constants.js";
import axios from "axios";

function UploadPage() {
   const [imageUrl, setImageUrl] = useState(null);
   const history = useNavigate ();
   const onSubmit = (values) => {
      axios
         .post(`${API_URL}/products`, {
            name: values.name,
            description: values.description,
            seller: values.seller,
            price: parseInt(values.price), //문자형을 숫자로 변경
            imageUrl: imageUrl,
         })
         .then((result) => {
            console.log(result);
            history('/', { replace: true });
         })
         .catch((error) => {
            console.error(error);
            message.error(`에러가 발생했습니다 ${error.message}`);
         });
   };
   const onChangeImage = (info) => {
      if (info.file.status === "uploading") {
         return;
      }
      if (info.file.status === "done") {
         const response = info.file.response;
         const imageUrl = response.imageUrl;
         setImageUrl(imageUrl);
      }
   };
   return (
      <div id="upload-container">
         <Form name="상품 업로드" onFinish={onSubmit} initialValues={{ price: 0 }}>
            <Form.Item name="upload" label={<div className="upload-label">상품 사진</div>}>
               <Upload name="image" action={`${API_URL}/image`} listType="picture" showUploadList={false} onChange={onChangeImage} >
                  {imageUrl ? (
                     <img id="upload-img" src={`${API_URL}/${imageUrl}`} alt='업로드사진' />
                  ) : (
                     <div id="upload-img">
                        <img src="/images/icons/camera.png"  alt='업로드사진'/>
                        <span>이미지를 업로드해주세요.</span>
                     </div>
                  )}
               </Upload>
            </Form.Item>
            <Divider />
            <Form.Item label={<div className="upload-label">판매자명</div>} name="seller" rules={[{ required: true, message: "판매자명을 입력해주세요" }]}>
               <Input className="upload-name" size="large" placeholder="이름을 입력해주세요" />
            </Form.Item>
            <Divider />
            <Form.Item name="name" label={<div className="upload-label">상품명</div>} rules={[{ required: true, message: "상품명을 입력해주세요" }]}>
               <Input className="upload-name" size="large" placeholder="상품명을 입력해주세요" />
            </Form.Item>
            <Divider />
            <Form.Item name="price" label={<div className="upload-label">판매가</div>} rules={[{ required: true, message: "판매가를 입력해주세요" }]}>
               <InputNumber className="upload-price" size="large" min={0} />
            </Form.Item>
            <Divider />
            <Form.Item name="description" label={<div className="upload-label">상품설명</div>} rules={[{ required: true, message: "상품설명을 입력해주세요" }]}>
               <Input.TextArea size="large" id="product-description" showCount maxLength={300} placeholder="상품설명을 작성해주세요" />
            </Form.Item>
            <Form.Item>
               <Button id="submit-button" size="large" htmlType="submit">
                  상품등록하기
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
}
export default UploadPage;