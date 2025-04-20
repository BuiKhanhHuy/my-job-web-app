/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import dayjs from 'dayjs';
import { utils, writeFileXLSX } from 'xlsx';

const xlsxUtils = {
  exportToXLSX: (data, fileName="data") => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(wb, `${fileName}_${dayjs(new Date()).format("DD-MM-YYYY")}.xlsx`);
  },
};

export default xlsxUtils;
