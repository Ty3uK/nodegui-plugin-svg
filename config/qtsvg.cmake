function(AddQtSvgSupport addonName)

    # execute_process(COMMAND node -p "require('@nodegui/qode').qtHome"
    #     WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
    #     OUTPUT_VARIABLE QT_HOME_DIR
    # )
    
    if(DEFINED ENV{QT_INSTALL_DIR})
        # Allows to use custom Qt installation via QT_INSTALL_DIR env variable
        message(STATUS "Using Custom QT installation for ${addonName} QT_INSTALL_DIR:$ENV{QT_INSTALL_DIR}")
        set(QT_HOME_DIR "$ENV{QT_INSTALL_DIR}")
    endif()
   
    string(REPLACE "\n" "" QT_HOME_DIR "${QT_HOME_DIR}")
    string(REPLACE "\"" "" QT_HOME_DIR "${QT_HOME_DIR}")
    
    if (APPLE) 
        target_include_directories(${addonName} PRIVATE
            "${QT_HOME_DIR}/include"
            "${QT_HOME_DIR}/lib/QtSvg.framework/Versions/5/Headers"
        )
        target_link_libraries(${addonName} PRIVATE
            "${QT_HOME_DIR}/lib/QtSvg.framework/Versions/5/QtSvg"
        )
    endif()

    if (WIN32)       
        target_include_directories(${addonName} PRIVATE
            "${QT_HOME_DIR}\\include"
            "${QT_HOME_DIR}\\include\\QtSvg"
        )
        target_link_libraries(${addonName} PRIVATE
            "${QT_HOME_DIR}\\lib\\QtSvg.lib"
        )
    endif()

    if(UNIX AND NOT APPLE)
        set(LINUX TRUE)
    endif()

    if(LINUX)
        target_include_directories(${addonName} PRIVATE
            "${QT_HOME_DIR}/include"
            "${QT_HOME_DIR}/include/QtSvg"
        )
        target_link_libraries(${addonName} PRIVATE
            "${QT_HOME_DIR}/lib/QtSvg.so"
        )
    endif()    

  
endfunction(AddQtSvgSupport addonName)