# Description:
# Experimental framework for generic TensorBoard data providers.

package(default_visibility = ["//tensorboard:internal"])

licenses(["notice"])

exports_files(["LICENSE"])

py_library(
    name = "lib_init_only",
    srcs = ["__init__.py"],
    srcs_version = "PY2AND3",
    visibility = ["//tensorboard:internal"],
    deps = [
        "//tensorboard/data/experimental:lib_init_only",
    ],
)

py_library(
    name = "provider",
    srcs = ["provider.py"],
    srcs_version = "PY3",
    deps = [
        "//tensorboard:expect_numpy_installed",
        "@org_pythonhosted_six",
    ],
)

py_test(
    name = "provider_test",
    size = "small",
    srcs = ["provider_test.py"],
    srcs_version = "PY2AND3",
    tags = ["support_notf"],
    deps = [
        ":provider",
        "//tensorboard:expect_numpy_installed",
        "//tensorboard:test",
        "@org_pythonhosted_six",
    ],
)

py_library(
    name = "dispatching_provider",
    srcs = ["dispatching_provider.py"],
    srcs_version = "PY3",
    deps = [
        ":provider",
        "//tensorboard:errors",
    ],
)

py_test(
    name = "dispatching_provider_test",
    size = "small",
    srcs = ["dispatching_provider_test.py"],
    srcs_version = "PY3",
    tags = ["support_notf"],
    deps = [
        ":dispatching_provider",
        ":provider",
        "//tensorboard:context",
        "//tensorboard:errors",
        "//tensorboard:test",
    ],
)
