import ace from 'ace-builds'
// 主题风格
import 'ace-builds/src-min-noconflict/theme-xcode'
import 'ace-builds/src-min-noconflict/theme-chrome'
import 'ace-builds/src-min-noconflict/theme-github'
import 'ace-builds/src-min-noconflict/theme-monokai'
import 'ace-builds/src-min-noconflict/theme-dracula'
// 代码模式
import 'ace-builds/src-min-noconflict/mode-c_cpp'
import 'ace-builds/src-min-noconflict/mode-csharp'
import 'ace-builds/src-min-noconflict/mode-golang'
import 'ace-builds/src-min-noconflict/mode-kotlin'
import 'ace-builds/src-min-noconflict/mode-java'
import 'ace-builds/src-min-noconflict/mode-javascript'
import 'ace-builds/src-min-noconflict/mode-typescript'
import 'ace-builds/src-min-noconflict/mode-python'
import 'ace-builds/src-min-noconflict/mode-php'
import 'ace-builds/src-min-noconflict/mode-lua'
import 'ace-builds/src-min-noconflict/mode-sh'
import 'ace-builds/src-min-noconflict/mode-r'
import 'ace-builds/src-min-noconflict/mode-lisp'
import 'ace-builds/src-min-noconflict/mode-haskell'
import 'ace-builds/src-min-noconflict/mode-assembly_x86'
// 拓展
import 'ace-builds/src-min-noconflict/ext-language_tools'
ace.require("ace/ext/language_tools")
import 'ace-builds/src-min-noconflict/ext-searchbox'
ace.require("ace/ext/searchbox")
import 'ace-builds/src-min-noconflict/ext-prompt'
ace.require("ace/ext/prompt")
// 语法库
import baseWorkerUrl from 'ace-builds/src-min-noconflict/worker-base?url'
ace.config.setModuleUrl('ace/mode/base_worker', baseWorkerUrl);
import coffeeWorkerUrl from 'ace-builds/src-min-noconflict/worker-coffee?url'
ace.config.setModuleUrl('ace/mode/coffee_worker', coffeeWorkerUrl);
// 代码段
import c_cppSnippetUrl from 'ace-builds/src-min-noconflict/snippets/c_cpp?url'
ace.config.setModuleUrl('ace/snippets/c_cpp', c_cppSnippetUrl)
import javaSnippetUrl from 'ace-builds/src-min-noconflict/snippets/java?url'
ace.config.setModuleUrl('ace/snippets/java', javaSnippetUrl)
import pythonSnippetUrl from 'ace-builds/src-min-noconflict/snippets/python?url'
ace.config.setModuleUrl('ace/snippets/python', pythonSnippetUrl)