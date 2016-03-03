/**
 *
 */
$(function() {
    var $atoms = $('.atom'),
        $atomConfig = $('#atom-config'),
        saveMsg = function (type) {
            var typeClass,
                typeMsg;

            switch (type) {
                case 'ok':
                    typeClass = 'ckeditor-save-msg-ok';
                    typeMsg = 'Saved!';
                    break;
                case 'err':
                    typeClass = 'ckeditor-save-msg-err';
                    typeMsg = 'Error!';
                    break;
                default:
                    typeClass = 'ckeditor-save-msg-saving';
                    typeMsg = 'Saving ...';
                    break;
            }
            return '<div class="ckeditor-save-msg '+typeClass+'">'+typeMsg+'</div>';
        };

    $('body').on('click', 'div.ckeditor-save-msg', function() {
        $(this).slideUp();
    });

    $atoms.each(function() {
        $(this).attr('contenteditable', true);
    });

    CKEDITOR.config.inlinesave = {
        postUrl: $atomConfig.data('save-url'),
        postData: {}, // editorID, editabledata
        useJSON: false,
        useColorIcon: true,
        onSave: function() {
            $('div.ckeditor-save-msg').hide();
            $('body').prepend(saveMsg());
            return true;
        },
        onSuccess: function() {
            $('div.ckeditor-save-msg').hide();
            $('body').prepend(saveMsg('ok'));
            return true;
        },
        onFailure: function() {
            $('div.ckeditor-save-msg').hide();
            $('body').prepend(saveMsg('err'));
            return false;
        }
    };
});