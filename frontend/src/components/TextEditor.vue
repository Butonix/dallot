<template>
	<div class="text-editor">
		<div 
			@input.capture="updateEditorBlock"
			@keydown.capture.8="removeEditorBlock($event.target, true)"
			keydown.capture.46="removeEditorBlock($event.target, false, true)"
			@focus.capture="showTools($event.target)"
			@blur.capture="toolsView = true"
			class="text-editor__edit-area"
		>
			<div class="text-editor__edit-block" contenteditable></div>
		</div>

		<div 
			v-if="toolsView"
			ref="htmlTools"
			class="text-editor__tools text-editor__html-tools"
		>
			<icon icon="plus" class="text-editor__tools-icon" />
			<ul ref="htmlToolsbar" class="text-editor__toolsbar">
				<li>
					<icon icon="bug" class="text-editor__toolsbar-icon" />
				</li>
				<li>
					<icon icon="eye" class="text-editor__toolsbar-icon" />
				</li>
				<li>
					<icon icon="times" class="text-editor__toolsbar-icon" />
				</li>
				<li>
					<icon icon="check" class="text-editor__toolsbar-icon" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TextEditor',
		data: () => ({
			toolsView: false
		}),
		methods: {
			updateEditorBlock(event) {
				if(event.target.querySelector('div')) {
					var html = event.target.querySelector('div').innerHTML.replace('<br>', '')
					var divs = event.target.querySelectorAll('div')
					for(var i = 0; i < divs.length; i++)
						divs[i].remove()
					this.addEditorBlock(event.target, html)
				} else if(this.toolsView && event.target.textContent) {
					this.toolsView = false
				} else if(!this.toolsView && !event.target.textContent) {
					this.showTools(event.target)
				}
			},

			addEditorBlock(obj, html) {
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

			removeEditorBlock(obj, back=false, del=false) {
				if(!obj.textContent && obj.parentElement.childElementCount > 1) {
					var range = document.createRange()
					if(back && obj.previousElementSibling) {
						obj.previousElementSibling.innerHTML += '.'
						range.selectNodeContents(obj.previousElementSibling)
						range.collapse()
					} else if(del && obj.nextElementSibling) {
						obj.nextElementSibling.innerHTML = '.' + obj.nextElementSibling.innerHTML
						range.selectNodeContents(obj.nextElementSibling)
						range.collapse(true)
					} else return
					obj.remove()
					window.getSelection().removeAllRanges()
					window.getSelection().addRange(range)
				}
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
					if(blocks[i].textContent.trim())
						content += '<div>' + blocks[i].innerHTML + '</div>'
				return content
			},

			showTools(obj) {
				if(!obj.textContent) {
					this.toolsView = true
					setTimeout(() => {
						this.$refs.htmlTools.style.top = `${obj.offsetTop}px`
						this.$refs.htmlTools.style.left = `${obj.offsetLeft + 10}px`
					}, 0)
				}
			}
		}
	}
</script>

<style>
	.text-editor {
		position: relative;
	}

	.text-editor__edit-block {
		outline: none;
	}

	.text-editor__tools {
		position: absolute;
		left: 0;
		top: 0;
		font-size: 15px;
	}

	.text-editor__tools-icon:hover + .text-editor__toolsbar,
	.text-editor__toolsbar:hover {
		opacity: 1;
		max-height: 50px;
	}

	.text-editor__toolsbar {
		list-style: none;
		display: flex;
		position: absolute;
		margin: 0;
		padding: 0;
		opacity: 0;
		max-height: 0;
		overflow: hidden;
		transition: .3s;
	}

	.text-editor__toolsbar > li {
		display: flex;
		align-items: center;
		background: #9b59b6;
		color: #fff;
	}

	.text-editor__toolsbar > li:hover {
		background: #8e44ad;
		cursor: pointer;
	}

	.text-editor__toolsbar > li:first-child {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	.text-editor__toolsbar > li:last-child {
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.text-editor__toolsbar-icon {
		display: block;
		padding: 7px;
		font-size: 15px;
	}
</style>