#pragma once

#include <QSvgWidget>

#include "core/NodeWidget/nodewidget.h"

class NSvgWidget : public QSvgWidget, public NodeWidget {
  Q_OBJECT
  NODEWIDGET_IMPLEMENTATIONS(QSvgWidget)
 public:
  using QSvgWidget::QSvgWidget;  // inherit all constructors of QSvgWidget
};
