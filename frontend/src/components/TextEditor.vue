<template>
	<div @input.capture="updateEditorBlock" @keydown.capture.delete="removeEditorBlock($event.target)" class="text-editor">
		<div class="text-editor__block" contenteditable></div>
	</div>
</template>

<script>
	export default {
		name: 'TextEditor',
		methods: {
			updateEditorBlock(event) {
				if(event.target.querySelector('div')) {
					var html = event.target.querySelector('div').innerHTML.replace('<br>', '')
					var divs = event.target.querySelectorAll('div')
					for(var i = 0; i < divs.length; i++)
						divs[i].remove()
					this.addEditorBlock(event.target, html)
				}
			},
			addEditorBlock: (obj, html) => {
				if(!obj.textContent)
					return obj
				var element = document.createElement('div')
				element.classList.add('text-editor__block')
				element.setAttribute('contenteditable', '')
				element.innerHTML = html
				obj.after(element)
				obj.nextElementSibling.focus()
				return obj.nextElementSibling
			},
			removeEditorBlock: (obj) => {
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
			},
			clearAll: () => {
				var blocks = document.querySelectorAll('.text-editor__block')
				blocks[0].innerHTML = ''
				for(var i = 1; i < blocks.length; i++)
					blocks[i].remove()
			},
			getContent: () => {
				var content = ''
				var blocks = document.querySelectorAll('.text-editor__block')
				for(var i = 0; i < blocks.length; i++)
					if(blocks[i].textContent.trim()) {
						console.log(blocks[i].textContent.trim())
						content += '<div>' + blocks[i].innerHTML + '</div>'
					}
				return content
			}
		}
	}
</script>