import React,{Component} from "react";
import {connect} from "react-redux";
import {Table} from "react-bootstrap"

class GraniteList extends Component {
    state = {
        list: [
            {
                name : "white stone",
                price: 10,
                size : "0-5 mm"
            },
            {
                name : "red stone",
                price: 10,
                size : "0-5 mm"
            },
            {
                name : "gray stone",
                price: 10,
                size : "0-5 mm"
            }
        ],
    };

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Granite List</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>পাথরের নাম </th>
                        <th>বিক্রয়মূল্য (প্রতি মে.টন) (মার্কিন ডলার)</th>
                        <th>গ্রানাইট পাথরের আকার</th>
                        <th>লোডিং চার্জ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.list.map((item,key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td> {item.name} </td>
                                <td> {item.price} </td>
                                <td> {item.size} </td>
                                <td>
                                    প্রতি মেট্রিক টন ক্রাস্ড পাথরের লোডিং চার্জ ৬০.০০ এবং বোল্ডার পাথরের লোডিং চার্জ ৮০.০০ টাকা।
                                    ১ মার্কিন ডলার = ৮৪.৯৫ টাকা
                                    (৩১ ‍ডিসেম্বর ২০২০ পর্যন্ত)
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps)(GraniteList)