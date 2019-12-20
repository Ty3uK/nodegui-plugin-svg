#include "qsvgwidget_wrap.h"

#include <QWidget>

#include "Extras/Utils/nutils.h"
#include "QtWidgets/QWidget/qwidget_wrap.h"
Napi::FunctionReference QSvgWidgetWrap::constructor;

Napi::Object QSvgWidgetWrap::init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);
  char CLASSNAME[] = "QSvgWidget";
  Napi::Function func =
      DefineClass(env, CLASSNAME,
                  {InstanceMethod("load", &QSvgWidgetWrap::load),
                   QWIDGET_WRAPPED_METHODS_EXPORT_DEFINE(QSvgWidgetWrap)});
  constructor = Napi::Persistent(func);
  exports.Set(CLASSNAME, func);
  return exports;
}

NWidget* QSvgWidgetWrap::getParentFromInfo(Napi::Value value) {
  if (value.IsNull() || value.IsUndefined()) {
    return nullptr;
  }

  Napi::Object parentObject = value.As<Napi::Object>();
  QWidgetWrap* parentWidgetWrap = Napi::ObjectWrap<QWidgetWrap>::Unwrap(parentObject);

  return parentWidgetWrap->getInternalInstance();
}

NSvgWidget* QSvgWidgetWrap::getInternalInstance() { return this->instance; }

QSvgWidgetWrap::~QSvgWidgetWrap() { extrautils::safeDelete(this->instance); }

QSvgWidgetWrap::QSvgWidgetWrap(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<QSvgWidgetWrap>(info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  if (info.Length() == 2) {
    Napi::String url = info[0].As<Napi::String>();
    QString imageUrl = QString::fromUtf8(url.Utf8Value().c_str());
    this->instance = new NSvgWidget(imageUrl, QSvgWidgetWrap::getParentFromInfo(info[1]));
  } else if (info.Length() == 1) {
    this->instance = new NSvgWidget(QSvgWidgetWrap::getParentFromInfo(info[0]));
  } else {
    this->instance = new NSvgWidget(nullptr);
  }

  auto flexNode = this->getInternalInstance()->getFlexNode();
  YGNodeSetNodeType(flexNode, YGNodeType::YGNodeTypeText);
  this->rawData =
      extrautils::configureQWidget(this->getInternalInstance(), flexNode, true);
}

Napi::Value QSvgWidgetWrap::load(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  if (info[0].IsBuffer()) {
    Napi::Buffer<const char> buffer = info[0].As<Napi::Buffer<const char>>();
    QByteArray byteArray = QByteArray(buffer.Data(), buffer.Length());
    this->instance->load(byteArray);
  } else if (info[0].IsString()) {
    Napi::String text = info[0].As<Napi::String>();
    std::string label = text.Utf8Value();
    this->instance->load(QString::fromUtf8(label.c_str()));
  } else {
    Napi::TypeError::New(env, "Wrong argument type")
        .ThrowAsJavaScriptException();
  }

  return env.Null();
}
