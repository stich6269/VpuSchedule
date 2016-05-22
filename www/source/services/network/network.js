(function () {

    function parseData(data, needError, needSuccess) {
        var json, message;

        try {
            json = JSON.parse(data);
        } catch (e) {
            json = data;
        }

        if (json.hasOwnProperty('SearchResult')) {
            try {
                json.SearchResult = JSON.parse(json.SearchResult);
            } catch (e) {}
        }

        if (json.hasOwnProperty('serializedJSONBody') && json.serializedJSONBody && json.serializedJSONBody.length) {
            try {
                json.serializedJSONBody = JSON.parse(json.serializedJSONBody);
            } catch (e) {
            }
        }

        if (needError && json.hasOwnProperty('errorMessage') && json.errorMessage.length ||
            needError && json.hasOwnProperty('_ErrorMessages') && json._ErrorMessages.length && json._ErrorMessages[0].length)
        {
            if (json.hasOwnProperty('errorMessage')) {
                try {
                    json.errorMessage = JSON.parse(json.errorMessage);
                } catch (e) {}
                if (json.errorMessage && json.errorMessage.hasOwnProperty('ErrorMessages')) {
                    message = json.errorMessage.ErrorMessages;

                    if(message.length && message[0]) {
                        message = message[0];
                        if (/<a.+<\/a>/i.test(message)) {
                            message = message.replace(/<a.+<\/a>/i, function (f, i, s) {
                                return f.slice(f.indexOf('>') + 1).replace(/<\/a>/i, '');
                            });
                        }
                    }
                } else {
                    message = json.errorMessage;
                }
            } else {
                message = json._ErrorMessages;
            }

            RAD.application.showAlert({message:message});
        }


        if (needSuccess && json.hasOwnProperty('_SuccessMessages') && json._SuccessMessages.length) {
            RAD.core.publish('application.alert', {
                message: json._SuccessMessages
            });
        }

        if(RAD.application.verbose) {
            console.log(JSON.stringify(json, undefined, 4));
            console.groupEnd();
        }
        return json;
    }

    var BASE_URL = 'http://vpuapp.herokuapp.com/',
        GROUPS_LIST = BASE_URL + 'get_groups',
        LESSONS_LIST = BASE_URL + 'get_schedule',
        TEACHERS_LIST = BASE_URL + 'get_teachers';

        Network = Backbone.Model.extend({
            initialize: function () {
                this.set({
                    teachers: TEACHERS_LIST,
                    groups: GROUPS_LIST,
                    lessons: LESSONS_LIST
                });
            }
        });
        network = new Network;


    RAD.service('service.network', RAD.Blanks.Service.extend({
        _saveWoundFormDf: undefined,
        requestCounter: 0,

        loadingShow: function () {
            this.requestCounter++;
            if (this.requestCounter === 1) {
                $('#load-element').toggleClass('hidden', false);
            }
        },
        loadingHide: function () {
            this.requestCounter--;
            if (this.requestCounter <= 0) {
                $('#load-element').toggleClass('hidden', true);
                this.requestCounter = 0;
            }
        },
        ajaxRequest: function (Obj) {
            var url = Obj.url,
                data = null,
                self = this,
                jqXHR;

            if (Obj.requestData) {
                data = JSON.stringify(Obj.requestData);
            }

            jqXHR = jQuery.ajax({
                type: Obj.type || 'GET',
                url: url,
                crossDomain: true,
                timeout: 5000,
                data: data,
                headers: '',
                contentType: Obj.contentType || "application/json",
                beforeSend: function () {
                    !Obj.silent && self.loadingShow();
                },
                success: function (data) {
                    var response = parseData(data, Obj.needErrorMsg, Obj.needSuccessMsg);
                    !Obj.silent && self.loadingHide();

                    if (typeof Obj.success === 'function') {
                        Obj.success(response);
                    }
                },
                error: function (jqXHR) {
                    jqXHR.status != 200 && self.showError(jqXHR.status);
                    self.loadingHide();
                    if (typeof Obj.error === 'function') {
                        Obj.error(jqXHR);
                    }
                },
                complete: function (jqXHR) {
                    if (typeof Obj.complete === 'function') {
                        Obj.complete(jqXHR);
                    }
                }
            });

            return jqXHR;
        },

        checkConnection: function () {
            var status = {
                connected: false,
                type: ''
            };
            if (navigator.connection) {
                var networkState = navigator.connection.type,
                    states = {};

                states[Connection.UNKNOWN] = 'Неизвестное соединение';
                states[Connection.ETHERNET] = 'Интернет соединение';
                states[Connection.WIFI] = 'WiFi соединение';
                states[Connection.CELL_2G] = '2G соединение';
                states[Connection.CELL_3G] = '3G соединение';
                states[Connection.CELL_4G] = '4G соединение';
                states[Connection.CELL] = 'Генерация соединения';
                states[Connection.NONE] = 'Интернет соединение отсутствует';

                status.connected = networkState !== Connection.NONE;
                status.type = states[networkState];
            } else {
                status.connected = true;
                status.type = 'Неизвестное соединение.';
            }
            return status;
        },

        showError: function (statusCode) {
            var statusMsg = {
                    0: 'Сервер временно недоступен. Пожалуйста попробуйте позже.',
                    400: 'Запрос отменен.',
                    401: 'Ваша сессия истекла. Авторизуйтесь заново.',
                    500: 'На сервере произошла ошибка. Мы уже работаем наж ее устранением.'
                },
                connectionStatus = this.checkConnection(),
                alertOpt = {
                    message: null
                };

            if (!connectionStatus.connected) {
                alertOpt.message = "При загрузке данных произошла ошибка. Проверьте Ваше пожключение к сети."
            } else if (statusMsg[statusCode]) {
                alertOpt.message = statusMsg[statusCode];
            } else {
                alertOpt.message = "При загрузке данных произошла ошибка. Проверьте Ваше пожключение к сети."
            }

            RAD.application.showAlert({message:alertOpt.message});
        },


        get_groups: function (options) {
            this.ajaxRequest({
                type: 'get',
                url: network.get('groups'),
                success: options.success,
                error: options.error,
                needErrorMsg: true
            });
        },

        get_teachers: function (options) {
            this.ajaxRequest({
                type: 'get',
                url: network.get('teachers'),
                success: options.success,
                error: options.error,
                needErrorMsg: true
            });
        },

        get_schedule: function (options) {
            this.ajaxRequest({
                type: 'get',
                url: network.get('lessons') + '?id=' + options.extras.id,
                success: options.success,
                error: options.error,
                needErrorMsg: true
            });
        },
        
        onReceiveMsg: function (channel, data) {
            var parts = channel.split('.'),
                method = parts[2];
            if (typeof this[method] === 'function') {
                this[method](data);
            }
        }
    }));

}());