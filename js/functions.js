$(function () {

    $(document).on('click', 'a[data-role="navigate"], button[data-role="navigate"]', function (e) {
        e.preventDefault();
        let tag = this.tagName.toLowerCase(),
                href = tag == 'a' ? this.getAttribute('href').replace('#', '') : this.value.replace('#', '');

        navigate(href);
    });


    if (typeof hiragana != 'undefined' && hiragana) {

        let nrIntrebari = shuffle(hiragana).slice(0, 10), //get sub-array of first n elements AFTER shuffle
                outHtml = '<div class="text-dark text-center my-3">\
                                <h3>Ce reprezinta urmatorul semn?</h3>\
                            </div>',
                ascuns = 'd-flex',
                corecte = 0,
                varianteRaspuns = [],
                cnt = 1,
                err = [];


        for (let i = 0; i < hiragana.length; i++) {
            varianteRaspuns.push(Object.values(hiragana[i]));
        }

        for (let i = 0; i < nrIntrebari.length; i++) {


            let semn = Object.keys(nrIntrebari[i])[0],
                    raspuns = Object.values(nrIntrebari[i])[0];

            varianteRaspuns = arrayRemove(varianteRaspuns, raspuns);

            let varianteRaspuns3 = shuffle(varianteRaspuns).slice(0, 3);

            console.log(varianteRaspuns3);

            let variante = shuffle([raspuns, varianteRaspuns3[0], varianteRaspuns3[1], varianteRaspuns3[2]]);

//                console.log(semn , raspuns, variante);
            outHtml += `<section class="flex-column align-items-center justify-content-center ${ascuns}" data-semn="${semn}" data-raspuns="${raspuns}">
                            <div class="question mb-5" style="background-image: url('images/hiragana/${semn}');"></div>
                            <form class="w-100 raspunsuri">
                                <div class="form-group row text-center">
                                    <div class="col-6">
                                        <button type="button" class="btn btn-dark btn-block" value="${variante[0]}">${variante[0]}</button>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" class="btn btn-dark btn-block" value="${variante[1]}">${variante[1]}</button>
                                    </div>
                                </div>
                                <div class="form-group row text-center">
                                    <div class="col-6">
                                        <button type="button" class="btn btn-dark btn-block" value="${variante[2]}">${variante[2]}</button>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" class="btn btn-dark btn-block" value="${variante[3]}">${variante[3]}</button>
                                    </div>
                                </div>
                            </form>
                        </section>`;
            if (ascuns == 'd-flex') {
                ascuns = 'd-none';
            }

        }
        $('#html-content').html(outHtml);

        $('#html-content').on('click', '.raspunsuri button', function () {
            console.log(this.value);
            let $t = $(this),
                    $parent = $t.parents('section.flex-column'),
                    raspunsCorect = $parent.data('raspuns'),
                    semn = $parent.data('semn');

//            console.log(this.value, raspunsCorect);

            if (this.value == raspunsCorect) {
                corecte++;
            } else {
                err.push({semn: semn, rasp: raspunsCorect});
            }



            $parent.removeClass('d-flex').addClass('d-none').next().removeClass('d-none').addClass('d-flex');
            console.log(corecte);
            if (cnt == 10) {
                navigate('final');
                console.log(err);

                console.log(cnt);

            }
            cnt++;
            let finalHtml = '';

            finalHtml = `<section class="d-flex flex-column align-items-center justify-content-center" >
                                <div class="question mb-5"> 
                                <h2>${corecte}/10</h2>
                            </div>
                        </section>`;

            $('#html-content-final').html(finalHtml);
        });

    }
});

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function navigate(h) {
    $('div[data-role="page"]').addClass('d-none');
    window.location.hash = h;
    $('#' + h).removeClass('d-none');
}

