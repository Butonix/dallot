<template>
	<div>
		<div class="content__block post">
			<div class="post__header">
				Post title
			</div>
			<div @input.capture="UpdateEditorBlock" @keydown.capture.delete="RemoveEditorBlock($event.target)" class="text-editor post__body">
				<div class="text-editor__block" contenteditable></div>
			</div>
		</div>
	</div>
</template>

<script>
	import '@/assets/css/posts/post.css'

	export default {
		name: 'NewPost',
		methods: {
			UpdateEditorBlock(event) {
				if(event.inputType == 'insertFromPaste') {
					//var divs = event.target.querySelectorAll('div')
					1 == 1
				} else if(event.target.querySelector('div')) {
					var html = event.target.querySelector('div').innerHTML.replace('<br>', '')
					var divs = event.target.querySelectorAll('div')
					for(var i = 0; i < divs.length; i++)
						divs[i].remove()
					this.AddEditorBlock(event.target, html)
				}
			},
			AddEditorBlock(obj, html='') {
				var element = document.createElement('div')
				element.classList.add('text-editor__block')
				element.setAttribute('contenteditable', '')
				element.innerHTML = html
				obj.after(element)
				obj.nextElementSibling.focus()
				return obj.nextElementSibling
			},
			RemoveEditorBlock(obj) {
				if(!obj.textContent && obj.parentElement.childElementCount > 1) {
					var range = document.createRange()
					if(obj.previousElementSibling) {
						obj.previousElementSibling.innerHTML += '.'
						range.selectNodeContents(obj.previousElementSibling)
					} else {
						obj.nextElementSibling.innerText += '.'
						range.selectNodeContents(obj.nextElementSibling)
					}
					obj.remove()
					range.collapse()
					window.getSelection().removeAllRanges()
					window.getSelection().addRange(range)
				}
			}
		}
	}
</script>

<style>
.text-editor {
	
}

.text-editor__block {
	line-height: 25px;
	font-size: 16px;
}

.text-editor__block:after {
	display: none;

	content: attr(data-placeholder);
	position: relative;
	color: #fff;
	font-size: 20px;
}
</style>