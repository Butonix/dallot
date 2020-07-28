<template>
	<div class="text-editor">
		<div  @input.capture="updateEditorBlock" @keydown.capture.delete="removeEditorBlock($event.target)" @focus.capture="showToolsbar" @blur.capture="hideToolsbar" class="text-editor__edit-area">
			<div class="text-editor__edit-block" contenteditable></div>
		</div>
		<!--<div ref="toolsbar" class="text-editor__toolsbar">
			<div class="text-editor__tools-btn">
				<icon icon="plus" />
			</div>
			<div class="text-editor__tools-btn">
				<icon icon="times" />
			</div>
		</div>-->
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
				element.classList.add('text-editor__edit-block')
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
			showToolsbar() {
				this.$refs.toolsbar.style.top = event.target.offsetTop + 'px'
				this.$refs.toolsbar.style.left = event.target.offsetLeft + 'px'
				this.$refs.toolsbar.style.width = event.target.offsetWidth + 'px'
			},
			hideToolsbar() {
				this.$refs.toolsbar.style.top = 0
				this.$refs.toolsbar.style.left = 0
				this.$refs.toolsbar.style.width = '100%'
			},
			clearAll: () => {
				var blocks = document.querySelectorAll('.text-editor__edit-block')
				blocks[0].innerHTML = ''
				for(var i = 1; i < blocks.length; i++)
					blocks[i].remove()
			},
			getContent: () => {
				var content = ''
				var blocks = document.querySelectorAll('.text-editor__edit-block')
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

<style>
	.text-editor {
		position: relative;
	}

	.text-editor__toolsbar {
		border: 1px solid red;

		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
	}
</style>