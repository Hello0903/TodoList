$(document).ready(
	function(){
		var id_tab = 0;
		var list = [];
		// var todo={
		// 	'id':1,
		// 	'name':'Công việc 1'
		// }
		getoflocal()
		function getoflocal(){
			// localStorage.clear();
			if(localStorage.getItem('dolist')){
				list = localStorage.getItem('dolist').split(',');
			}

		var	str = "";		
			for (var i = 0 ; i < list.length ; i++) {
				console.log(list[i])
				addhtml(list[i])
			}
		}
		// addlist("<del>công việc thêm test</del>")
		function addlist(val){
			list.push(val.toString())
			console.log(list)
			localStorage.clear();
			localStorage.setItem('dolist',list)
			console.log(localStorage.getItem('dolist'));
			addhtml(val);
		}
		function addhtml(val){
			var	str = "";		
			str = "<div class='row todo tab-"+id_tab+"'>"
			str+="<div class='col-10'><span id='change'>"+val+"</span></div>"
			str+="<div class='col-2'>"
			str+="<i class='fas fa-check' data-id='tab-"+id_tab+"'></i>"
			str+="<i class='fas fa-times' data-id='tab-"+id_tab+"'></i>"
			str+="</div></div>"	
			$('.list-todo').prepend(str);
			id_tab++;
		}
		function reload(list){
			localStorage.clear();
			localStorage.setItem('dolist',list)
		}

		$('.add-btn').click(function(){
			var key = $("#todo-do").val();
			if (key != '') {
				list.push(key);
				reload(list);
				addhtml(key)
				// window.location.reload()
				$("#todo-do").val('');

				$('.fa-times').click(function(){
					var id = $(this).data('id');
					$('.'+id).remove();
					var data = id.split('-');
					console.log(data[1])
					list.splice(data[1],1)
					reload(list);
				})
				$('.fa-check').click(function () {
					var id = $(this).data('id');
					const span =  $('.'+id).find('span')
					// console.log(span)
					span.replaceWith( "<del>"+span.text()+"</del>" );
					var list_id = id.split('-')[1];
					list[list_id] = "<del>"+span.text()+"</del>"
					reload(list);
				})
			}
		})
		$('.fa-times').click(function(){
			var id = $(this).data('id');
			$('.'+id).remove();
			var data = id.split('-');
			console.log(data[1])
			list.splice(data[1],1)
			reload(list);
		})
		$('.fa-check').click(function () {
			var id = $(this).data('id');
		const span =  $('.'+id).find('span')
		// console.log(span)
		span.replaceWith( "<del>"+span.text()+"</del>" );
		var list_id = id.split('-')[1];
		list[list_id] = "<del>"+span.text()+"</del>"
		reload(list);
		})
		$('.delete-btn').click(function(){
			localStorage.clear();
			list = [];
			$('.list-todo').html('');

		})

	})