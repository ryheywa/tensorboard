load("//tensorboard/defs:defs.bzl", "tf_ts_library")

package(default_visibility = ["//tensorboard:internal"])

licenses(["notice"])

tf_ts_library(
    name = "tf_categorization_utils",
    srcs = [
        "categorizationUtils.ts",
        "tf-tag-filterer.ts",
    ],
    strict_checks = False,
    deps = [
        "//tensorboard/components_polymer3/polymer:irons_and_papers",
        "//tensorboard/components_polymer3/tf_backend",
        "//tensorboard/components_polymer3/tf_backend:type",
        "//tensorboard/components_polymer3/tf_storage",
        "//tensorboard/components_polymer3/vz_sorting",
        "@npm//@polymer/decorators",
        "@npm//@polymer/polymer",
        "@npm//@types/lodash",
        "@npm//lodash",
    ],
)
