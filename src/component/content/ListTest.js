import React from "react";
import '../../css/layout/ListTest.css';
import TestApi from "../../api/entities/TestApi.js"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';


function ListTest(props) {

    // const [ test, setTest] = useState([]);

    // useEffect(() => {

    //      TestApi.getTestAssignToMe(props.id).then(res => {
    //         setTest(res.data.data.data)
    //     }).catch(err => {
    //         toast.error("Có lỗi vui lòng reload lại trang");
    //     });       
    // },[props.id]);
    // const testList = test.map(tests => (
    //     <li key={test.id}></li>
    // )) 

    const test = [{
        id: 1,
        name: "Bài thi số 1"
    },
    {
        id: 2,
        name: "Bài thi số 2"
    },
    {
        id: 3,
        name: "Bài thi số 3"
    }]
    const testList = test.map((test) =>
        <ul key={test.id}>
            {test.name}
        </ul>)
    return (<div className="content">
        <h2>Danh sách bài thi</h2>
        <div className="section-list">
            {testList}
        </div>
    </div>);
}

export default ListTest;