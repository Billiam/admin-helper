/* Highlight Class */
(function () {
    'use strict';
        var data = local(function() {
            var table = document.createElement('table');

            table.innerHTML = '<tr class="entry_row">\
                <td class="day">Friday</td>\
                <td class="start_time">04:00PM</td>\
                <td class="end_time">04:30PM</td>\
                <td class="hours noneditable">0.75</td>\
                <td class="client"><span><a href="/page.php?id=NOTSIERRA">NOTSIERRA</a></span></td>\
                <td class="project">\
                    <span>WO151</span>\
                </td>\
                <td class="notes">Billable work</td>\
                <td class="wd_actions noneditable">\
                    <a name="user*112"></a>\
                    <input type="hidden" name="id" value="user*112">\
                    <input type="hidden" name="week_ending" value="02/21/14">\
                    <input type="hidden" name="ts_user" value="user">\
                    <div class="wd_actions_wrap">\
                        <a href="#" class="edit_entry viewing_entry" title="Edit Entry">\
                            <img border="0" src="assets/images/design/icons/fugue/pencil.png" width="16" height="16">\
                        </a>\
                        <a href="javascript: deleteRow(\'02/21/14\', \'user*112\')" class="delete_entry viewing_entry" title="Delete Entry">\
                            <img border="0" width="16" height="16" src="assets/images/design_v2/tables/wd-remove-entry.png">\
                        </a>\
                        <div class="flag_wrap editing_entry">\
                            <input type="checkbox" id="flag_ck_user*112" name="flag_entry" value="Y" class="flag_entry_submit" title="Flagged Entry">\
                        </div>\
                        <a href="#" class="save_entry editing_entry" title="Save Entry">\
                            <img border="0" src="assets/images/design/icons/fugue/tick-button.png" width="16" height="16">\
                        </a>\
                        <a href="#" class="cancel_edit editing_entry" title="Cancel">\
                            <img border="0" src="assets/images/design/icons/fugue/cross-button.png" width="16" height="16">\
                        </a>\
                    </div>\
                </td>\
            </tr\
            <tr class="entry_row">\
                <td class="day">Friday</td>\
                <td class="start_time">05:00PM</td>\
                <td class="end_time">05:45PM</td>\
                <td class="hours noneditable">0.75</td>\
                <td class="client"><span><a href="/page.php?id=SIERRA">SIERRA</a></span></td>\
                <td class="project">\
                    <span>ADMIN</span>\
                </td>\
                <td class="notes">First Client: Meeting with client to discuss future feature set.</td>\
                <td class="wd_actions noneditable">\
                    <a name="user*111"></a>\
                    <input type="hidden" name="id" value="user*111">\
                    <input type="hidden" name="week_ending" value="02/21/14">\
                    <input type="hidden" name="ts_user" value="user">\
                    <div class="wd_actions_wrap">\
                        <a href="#" class="edit_entry viewing_entry" title="Edit Entry">\
                            <img border="0" src="assets/images/design/icons/fugue/pencil.png" width="16" height="16">\
                        </a>\
                        <a href="javascript: deleteRow(\'02/21/14\', \'user*111\')" class="delete_entry viewing_entry" title="Delete Entry">\
                            <img border="0" width="16" height="16" src="assets/images/design_v2/tables/wd-remove-entry.png">\
                        </a>\
                        <div class="flag_wrap editing_entry">\
                            <input type="checkbox" id="flag_ck_user*111" name="flag_entry" value="Y" class="flag_entry_submit" title="Flagged Entry">\
                        </div>\
                        <a href="#" class="save_entry editing_entry" title="Save Entry">\
                            <img border="0" src="assets/images/design/icons/fugue/tick-button.png" width="16" height="16">\
                        </a>\
                        <a href="#" class="cancel_edit editing_entry" title="Cancel">\
                            <img border="0" src="assets/images/design/icons/fugue/cross-button.png" width="16" height="16">\
                        </a>\
                    </div>\
                </td>\
            </tr>';

            return table;
        });

        describe('AdminHelper', function () {
            describe('_iterateRows', function() {
                var spy = local(function() {
                    return sinon.spy();
                });

                var helper = local(function() {
                    return {
                        run: spy()
                    };
                });

                beforeEach(function() {
                    document.body.appendChild(data());

                    AdminHelper._iterateRows([helper()]);
                });

                afterEach(function() {
                    data().parentNode.removeChild(data());
                });

                it('finds admin rows', function() {
                    expect(spy().calledOnce).to.be.true;
                });

                it('passes admin rows to provided classes', function() {
                    var result = spy().firstCall.args[0].all();

                    expect(result[0]).to.have.property('tagName', 'TR');
                });
            });
        });
})();
