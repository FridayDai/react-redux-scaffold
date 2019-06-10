import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    slice(file, piece = 20 * 1024 * 1024) {
        const totalSize = file.size; // 文件总大小
        let start = 0; // 每次上传的开始字节
        let end = start + piece; // 每次上传的结尾字节
        const chunks = [];
        while (start < totalSize) {
            // 根据长度截取每次需要上传的数据
            // File对象继承自Blob对象，因此包含slice方法
            const blob = file.slice(start, end);
            chunks.push(blob);

            start = end;
            end = start + piece;
        }
        return chunks;
    }

    render() {
        return (
            <div>
                <input
                    id='uploadBtn'
                    type='file'
                    onChange={(e) => {
                        const file = e.target.files[0];

                        const chunks = this.slice(file);

                        chunks.forEach((item, index) => {
                            const formData = new FormData();
                            formData.append('file', item);
                            formData.append('index', index);

                            axios.post('http://localhost:6789/rest/upload', formData);
                        });
                    }}
                />
            </div>
        );
    }
}

export default Upload;
