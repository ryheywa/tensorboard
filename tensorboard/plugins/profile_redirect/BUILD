# Description:
# Plugin with installation instructions for dynamic profile plugin

package(default_visibility = ["//tensorboard:internal"])

licenses(["notice"])

exports_files(["LICENSE"])

py_library(
    name = "profile_redirect_plugin",
    srcs = ["profile_redirect_plugin.py"],
    srcs_version = "PY2AND3",
    deps = [
        "//tensorboard/plugins:base_plugin",
    ],
)

py_test(
    name = "profile_redirect_plugin_test",
    srcs = ["profile_redirect_plugin_test.py"],
    srcs_version = "PY3",
    deps = [
        ":profile_redirect_plugin",
        "//tensorboard:test",
        "//tensorboard/plugins:base_plugin",
    ],
)
