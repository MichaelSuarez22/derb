var FormStructure={
'category': CategoryClass,
'number': NumberClass,
'boolean': BooleanClass,
'condition': ConditionClass

}



function FormManager(container_id, api_url){

var fmanager = {
    'id': container_id,
    'api_url': api_url,
    'form_data': {},
    'init': function(){
    fetch(this.api_url, {
     headers: {'X-CSRFToken': getCookie('csrftoken'), 'Content-Type':'application/json'}
    }
    ).then((response)=>{return response.json()}
    ).then(this.base_request_success(this)).catch(
    (error)=>{console.log(error)}
    )
  },
  'base_request_success': function(instance){
  return function(data){
  instance.form_data = data;
  console.log(instance.form_data);
  instance.process_forms();
  }
  },
  'process_forms': function(){
  let context={'has_error': false, 'parent': this.id};
  this.process_children(this.form_data['data'], context)
  },
  'process_children': function(children,context){

  let keys=null;
  let indexclass = -1;
  let classM = null;
  let parent = context['parent'];
  let oldparent = context['parent'];
  for(var x=0; x<children.length; x++){
  keys=Object.keys(children[x]);
  indexclass = keys.indexOf('class');
  if( indexclass!== -1){
 classM = FormStructure[children[x].class]
parent =  classM.render_data(parent,children[x])
  }
   indexclass = keys.indexOf('children');
  if( indexclass!== -1){
   this.process_children(children[x].children, context)
   }
   context['parent'] = oldparent;
   parent = oldparent;
  }

 }

}
  fmanager.init();
return fmanager;
}

function process_form(container_id){
var fmanager = FormManager(container_id, document.derb_urls.form_api);


return fmanager;
}

process_form('formcontent');