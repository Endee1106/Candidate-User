import React from "react";
import '../../css/layout/HomeContent.css';
import TestApi from "../../api/entities/TestApi.js"
import { useEffect, useState } from "react"



function ListTest() {
    const [sections, setSections] = useState([]);
    
    useEffect(() => {
         TestApi.getListTest(100,0,'').then(res => {
            setSections(res.data.data.data)
        }).catch(err => {
            console.log("Có lỗi vui lòng reload lại trang");
        });
        
    },[]);
    const sectionList = sections.map(sections => (
        <li key={sections.id}>{sections.name}</li>
    )) 
    return (<div className="content">
        <h2>Danh sách bài thi</h2>
        <div className="section-list">
            {sectionList}
        </div>
    </div>);
}

export default ListTest;