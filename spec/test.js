$(function(){

  $('.social').socialShareCounters({
    showZero : true
  });

  $('.social-nospan').socialShareCounters({
      innerSpan : false
  });

  $('.social-span-custom-class').socialShareCounters({
      innerSpan : true,
      spanClass : 'custom__counter'
  });

});
