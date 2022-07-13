import React from "react";
import '../../css/layout/ListTest.css';
import GetListTestApi from "../../api/entities/GetListTestApi.js"
import { useEffect, useState } from "react"



function ListTest() {

     const [ test, setTest] = useState([]);

    useEffect(() => {
        GetListTestApi.getTest.then((res) => setTest(res.data.data))
    },[]);
   
    return (<div className="content">
        <h2>Danh sách bài thi</h2>
        <div className="section-list">
            <ul>
                {test.map((test, key )=> (
                    <li key={key} >
                        {test.testName}
                    </li>
                ))}
            </ul>
        </div>
    </div>);
}

export default ListTest;