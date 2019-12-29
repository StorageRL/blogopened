'use strict'

const Category = use('App/Models/Category');
const {validate} = use('Validator');

class CategoryController {
    async manage({view}){
        return view.render('admin/categories');
    }


    async add({request}) {
let output = {status:1};
const category_validation = await validate(request.all(), {
name: 'required|string|min:2|max:30',
subtitle: 'required|string|max:30'
})
if (category_validation.fails()) {
    output.messages = category_validation.messages();
    return output;
}
const new_category = new Category();
const {name , subtitle} = request.all();

new_category.name = name;
new_category.subtitle = subtitle;

try {
await new_category.save();
}catch(err){
return output;
}

output.status = 2;
return output;

    }


    async remove({request}) {
        let output = {status:1}
        const category_validation = await validate(request.all(), {
            id : 'required'
            })
            if (category_validation.fails()) {
                output.messages = category_validation.messages();
                return output;
            }

const cid = request.input('id');
const category = await Category.find(cid);

await category.delete();
output.status = 2;
return output;

    }

}

module.exports = CategoryController
