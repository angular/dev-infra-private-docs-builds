load("@npm//@angular/docs/markdown:_guides.bzl", _generate_guides = "generate_guides")
load("@npm//@angular/docs/markdown:_stackblitz.bzl", _generate_stackblitz = "generate_stackblitz")

generate_guides = _generate_guides
generate_stackblitz = _generate_stackblitz
