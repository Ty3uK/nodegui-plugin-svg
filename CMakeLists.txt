cmake_minimum_required(VERSION 3.1)
# -------------- Plugin Config ---------------
execute_process(COMMAND node -p "require('@nodegui/nodegui/plugin').CMAKE_HELPER_FILE"
    WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
    OUTPUT_VARIABLE NODEGUI_PLUGIN_CMAKE_HELPER
)
string(REPLACE "\n" "" NODEGUI_PLUGIN_CMAKE_HELPER ${NODEGUI_PLUGIN_CMAKE_HELPER})
string(REPLACE "\"" "" NODEGUI_PLUGIN_CMAKE_HELPER ${NODEGUI_PLUGIN_CMAKE_HELPER})
include("${NODEGUI_PLUGIN_CMAKE_HELPER}")
include(./config/qtsvg.cmake)

# -------------- User Config ---------------
set(PLUGIN_ADDON_NAME "nodegui_plugin_svg")

set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/dist)

project(${PLUGIN_ADDON_NAME})

add_library(${PLUGIN_ADDON_NAME} SHARED  
    "${CMAKE_JS_SRC}"
    "${PROJECT_SOURCE_DIR}/src/cpp/main.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/QSvgWidget/qsvgwidget_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/QSvgWidget/nsvgwidget.hpp"
) 

AddPluginConfig(${PLUGIN_ADDON_NAME})
AddQtSvgSupport(${PLUGIN_ADDON_NAME})

target_include_directories(${PLUGIN_ADDON_NAME} PRIVATE 
    "${CMAKE_JS_INC}" 
    "${PROJECT_SOURCE_DIR}"
)
target_link_libraries(${PLUGIN_ADDON_NAME} PRIVATE
    "${CMAKE_JS_LIB}"
)