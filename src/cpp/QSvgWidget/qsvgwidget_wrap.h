#pragma once

#include <napi.h>

#include <QPointer>

#include "QtWidgets/QWidget/qwidget_macro.h"
#include "nsvgwidget.hpp"

class QSvgWidgetWrap : public Napi::ObjectWrap<QSvgWidgetWrap> {
 private:
  QPointer<NSvgWidget> instance;

 public:
  QWIDGET_WRAPPED_METHODS_DECLARATION
  static Napi::Object init(Napi::Env env, Napi::Object exports);
  QSvgWidgetWrap(const Napi::CallbackInfo& info);
  ~QSvgWidgetWrap();
  NSvgWidget* getInternalInstance();
  // class constructor
  static Napi::FunctionReference constructor;
  // wrapped methods
  Napi::Value load(const Napi::CallbackInfo& info);
};