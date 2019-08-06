$(function() {
    const clientWith = document.body.clientWidth;
    const leftBorder = 50;
    const rightBorder = clientWith - (50+100);
    let add = 40;
    const speed = 40;
    setInterval(function() {
        let left = $('.box-tools').css('left');
        left = parseInt(left);
        if(left <= leftBorder) {
            add = speed;
        } 
        if(left >= rightBorder) {
            add = -speed;
        }
        $('.box-tools').css({
            left: left + add + 'px'
        });
    }, 150);
    // https://github.com/kylefox/jquery-modal
    // $('#ex1').modal();
    const clientHeight = document.body.clientHeight;
    let bottom = 0;
    let boxCount = 1;
    let version = 0;
    let isAnimate = false;
    let lastLeft = 120;
    const colors = ['#9ACBDE', '#FDF7EB', '#FFE3B1', '#AAEBCB', '#34CFC7', '#dec650'];
    const imgs = ['https://s3.qiufengh.com/2019-7-7/301565001546_.pic.jpg', 'https://s3.qiufengh.com/2019-7-7/281565001543_.pic.jpg', 'https://s3.qiufengh.com/2019-7-7/261565001541_.pic.jpg','https://s3.qiufengh.com/2019-7-7/251565001495_.pic.jpg', 'https://s3.qiufengh.com/2019-7-7/241565001494_.pic.jpg','https://s3.qiufengh.com/2019-7-7/201565001490_.pic.jpg'];
    const diff = 60;
    const total = 30;
    let lastColor = colors[Math.floor(Math.random()*6)];
    let lastImgs = imgs[Math.floor(Math.random()*6)];
    
    $('.box-tools .box-item').css({
        'background-color': lastColor,
        'background-image': 'url('+lastImgs+')',
    })

    $('#ex2').modal();

    setTimeout(function() {
        $.modal.close();
    }, 2000);

    $('.container').click(function() {
        if(!isAnimate) {
            isAnimate = true;
            const left = parseInt($('.box-tools').css('left'));
            if(lastLeft - left > diff || lastLeft - left < -diff) {
                $('#ex4').modal();
                setTimeout(function() {
                    location.reload();
                }, 1000);
            }
            lastLeft = left;
            const boxItem = $('<div class="box-item"></div>');
            boxItem.css({
                left: left + 'px',
                top: '50px',
                'background-color': lastColor,
                'background-image': 'url('+lastImgs+')',
            })
            let bgColor = colors[Math.floor(Math.random()*5)];
            let nowImg = imgs[Math.floor(Math.random()*6)];
            while(bgColor === lastColor) {
                bgColor = colors[Math.floor(Math.random()*5)];
            }
            while(lastImgs === nowImg) {
                nowImg = imgs[Math.floor(Math.random()*6)];;
            }
            $('.box-tools .box-item').css({
                'background-color': bgColor,
                'background-image': 'url('+nowImg+')',
            })
            lastColor = bgColor;
            lastImgs = nowImg;

            $('.bottom').append(boxItem);
            boxItem.animate({ 
                top: clientHeight - (boxCount + 1)* 100 + 'px'
            });
            boxCount ++;
            if(boxCount === 5) {
                version++;
                boxCount = 1;
                $('.modal .version').text(version + 1);
                $('.score-wrapper .score').text(version * 4 + boxCount);
                if(version * 4 + boxCount >= total) {
                    $('#ex3').modal({
                        showClose: false,
                        closeExisting: false
                    });
                    $('.score-wrapper .score').text('爆表！！！');
                    setTimeout(function() {
                        location.reload();
                    }, 5 *1000);
                    return;
                }
                setTimeout(function() {
                    $('.bottom').css({
                        'transform':'translateY(400px)',
                    });
                    $('#ex1').modal({
                        showClose: false,
                        closeExisting: false
                    });
                    setTimeout(function() {
                        $.modal.close();
                        const lastChild = $('.bottom').children(".box-item:last-child");
                        lastChild.css({
                            bottom: '0px',
                            top: 'auto'
                        })
                        $('.bottom').empty();
                        $('.bottom').addClass('bottom-none');
                        $('.bottom').css({
                            'transform':'translateY(0)',
                        });
                        $('.bottom').append(lastChild);
                        setTimeout(function() {
                            $('.bottom').removeClass('bottom-none')
                            isAnimate = false;
                        }, 100)
                    }, 1000);
                }, 1000);
            } else {
                if(version * 4 + boxCount >= total) {
                    $('#ex3').modal({
                        showClose: false,
                        closeExisting: false
                    });
                    setTimeout(function() {
                        location.reload();
                    }, 5 *1000);
                    return;
                }
                $('.score-wrapper .score').text(version * 4 + boxCount);
                setTimeout(function() {
                    isAnimate = false;
                }, 1000);
            }
            
        }
    })
});