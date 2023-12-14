load("@npm//@angular/docs/markdown:_guides.bzl", _generate_guides = "generate_guides")
load("@npm//@angular/docs/markdown:_stackblitz.bzl", _generate_stackblitz = "generate_stackblitz")
load("@npm//@angular/docs/markdown:_playground.bzl", _generate_playground = "generate_playground")
load("@npm//@angular/docs/markdown:_tutorial.bzl", _generate_tutorial = "generate_tutorial")

generate_guides = _generate_guides
generate_stackblitz = _generate_stackblitz
generate_playground = _generate_playground
generate_tutorial = _generate_tutorial
