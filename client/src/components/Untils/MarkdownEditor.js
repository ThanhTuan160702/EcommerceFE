import React, { memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MarkdownEditor = ({label, value, changeValue, name}) => {
   return (
     <div className='flex flex-col'>
      <div className='font-bold'>{label}</div>
       <Editor
        initialValue={value}
        apiKey='1wxn9hg1mmf0y4q8i1uiac7lfrzf1d92t4zdjyjyzlcog9mo'
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
         onChange={e => changeValue(prev => ({...prev, [name]: e.target.getContent()}))}
       />
     </div>
   );
 }

 export default memo(MarkdownEditor)