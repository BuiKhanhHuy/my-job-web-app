import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const convertEditorStateToHTMLString = (editorState) => {
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const markup = draftToHtml(rawContentState);

  return markup;
};

const createEditorStateFromHTMLString = (htmlString) => {
  const blocksFromHTML = convertFromHTML(htmlString);

  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return EditorState.createWithContent(content);
};

const salaryString = (salaryFrom, salaryTo) => {
  if (!salaryFrom && !salaryTo) return null;
  else
    return `${salaryFrom?.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })} - ${salaryTo?.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })}`;
};

const toSlug = (str) => {
  str = str.toLowerCase();

  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');

  str = str.replace(/([^0-9a-z-\s])/g, '');

  str = str.replace(/(\s+)/g, '-');

  str = str.replace(/^-+/g, '');

  str = str.replace(/-+$/g, '');

  return str;
};

export default toSlug;

export {
  convertEditorStateToHTMLString,
  createEditorStateFromHTMLString,
  salaryString,
  toSlug,
};
