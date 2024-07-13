import React from 'react'
import {Editor} from '@tinymce/tinymce-react' //TinyMCE is a rich-text editor that allows users to create formatted content within a user-friendly interface.
import {Controller} from 'react-hook-form'
import conf from '../conf/conf'

//** we can follow the below procedure with forwardRef to give the ref to parent, but here we will use 'Controller' from react-hook-form 

// export default function RTE() {
//     return (
//         <Editor
//             initialValue='default Value'
//             init={
//                 {
//                     branding:false,
//                     height:500,
//                     menubar:true,
//                     plugins:[
//                         'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//                         'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//                         'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
//                     ],
//                     toolbar:
//                             'undo redo | blocks | ' +
//                             'bold italic forecolor | alignleft aligncenter ' +
//                             'alignright alignjustify | bullist numlist outdent indent | ' +
//                             'removeformat | help',
//                 }
//             }
//         />
//     )
// }

export default function RTE({name,control,label,defaultValue=""}){   //this control is responsible for pass the states to the parent form
    return(
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>
            {label}</label>}
            <Controller
                name={name  || 'content'}
                control={control}
                render={({field: {onChange}})=> (
                    <Editor
                        apiKey={conf.tinymceAPIKey} // for using tinymce we have to give valid apikey
                        initialValue={defaultValue}
                        init={
                            {
                                initialValue: defaultValue,
                                height:500,
                                menubar:true,
                                plugins:[
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar:
                                        'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

                            }
                        }
                        onEditorChange={onchange}
                    />
                )}
            />
        </div>
    )
}