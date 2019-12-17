#include "src/cpp/QSvgWidget/qsvgwidget_wrap.h"
#include <napi.h>

Napi::Object Main(Napi::Env env, Napi::Object exports) {
    QSvgWidgetWrap::init(env, exports);
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Main)
