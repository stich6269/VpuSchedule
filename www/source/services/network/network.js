(function () {
    var BASE_URL = 'http://localhost:3000/', //'http://vpuapp.herokuapp.com/',
        GET_LIST = BASE_URL + 'get_list',
        LESSONS_LIST = BASE_URL + 'get_schedule';

        Network = Backbone.Model.extend({
            initialize: function () {
                this.set({
                    list: GET_LIST,
                    lessons: LESSONS_LIST
                });
            }
        });
    
        network = new Network;
    
    RAD.service('service.network', RAD.Blanks.Service.extend({
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
                timeout: 10000,
                data: data,
                headers: '',
                contentType: Obj.contentType || "application/json",
                beforeSend: function () {
                    !Obj.silent && self.loadingShow();
                },
                success: function (data) {
                    !Obj.silent && self.loadingHide();

                    if (typeof Obj.success === 'function') {
                        Obj.success(data);
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

        showError: function (statusCode) {
            console.log(statusCode)
            var message = 'Ошибка при загрузке данных. Попробуйтеобновить страницу или ' +
                'сообщите об ошибке администратору.',
                statusMsg = {
                    0: 'Сервер временно недоступен. Пожалуйста попробуйте позже.',
                    400: 'Запрос отменен.',
                    401: 'Ваша сессия истекла. Авторизуйтесь заново.',
                    500: 'На сервере произошла ошибка. Мы уже работаем над ее устранением.',
                    404: 'Сервер временно недоступен. Пожалуйста попробуйте позже.'
                };
            
            if (statusMsg[statusCode]) {
                message = statusMsg[statusCode];
            } else {
               message = "При загрузке данных произошла ошибка. Проверьте Ваше подключение к сети."
            }
            
            RAD.application.showAlert({message: message});
        },


        get_list: function (options) {
            this.ajaxRequest({
                type: 'get',
                url: network.get('list'),
                success: options.success,
                error: options.error
            });
        },

      
        get_schedule: function (options) {
            this.ajaxRequest({
                type: 'get',
                url: network.get('lessons') + '?id=' + options.extras.id,
                success: options.success,
                error: options.error
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